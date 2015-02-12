<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Cookie;

use Houston\Common\System;
use Houston\Component\Payment;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

// Logout of system
$app->get('/auth/logout', function(Request $request, Application $app){	
	$response = Response::create('', 302, array("Location" => "/"));
	$response->headers->clearCookie('r');
	
	System::destroySession($app);

	return $response;
});

// Login to system
$app->post('/auth/login', function(Request $request, Application $app) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	$userModel->loadUser($json->user);
		
	// Does verified user exist?
	if(!$userModel->isVerified($json->user)) return -1;
	
	// Do password hashes match?
	if($userModel::hashPassword($json->password) !== $userModel->user['password']) return -1;
	
	$companyModel = new CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	
	// Does this company have a valid subscription (check with Stripe)
	$payment = new Payment($app);
	if(!$payment->validSubscription($companyModel->company['stripeCustomerID'])) return -1;
	
	// Authenticate session and register default database connection
	System::setupSession($app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);

	// Remember me?
	if($json->remember == 1) {
		$remember = $userModel->rememberMeSet($json->user);
		
		$cookie = new Cookie('r', $remember, (time() + 3600 * 24 * 30));
		
		$response = new Response();
		$response->setContent('1');
		$response->setStatusCode(Response::HTTP_OK);
		$response->headers->setCookie($cookie);
		
		return $response;
	}
	
	return 1;
});

// Reset password request
$app->post('/auth/reset', function(Request $request, Application $app) {		
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	$userModel->loadUser($json->emailAddress);
	
	// Flag password reset request on user account and generate token
	$token = $userModel->resetPasswordRequest($json->emailAddress);
	
	// Send email link
	mail($json->emailAddress, "Houston - Reset Password", "A request to reset the password of the account associated with this email address was recently submitted. If this was not submitted by you, please ignore this email.\r\n\r\nIf you would like to proceed with the password reset please click the following link: ".Config::DOMAIN."/#/reset/".$token);
	
	return 1;
});

// Reset password
$app->post('/auth/reset/complete', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	
	$userModel->resetPassword($json->token, $json->password);
	
	// Load users company to get the database identifier
	$companyModel = new CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	
	// Authenticate session
	System::setupSession($app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);
	
	return 1;
});

// Register new user
$app->post('/register', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$stripeToken = $json->stripeToken; 
	unset($json->stripeToken);
	
	$stripePlan = $json->plan; 
	unset($json->plan);
	
	$userModel = new UserModel($app);
	$companyModel = new CompanyModel($app);
	
	// Does verified user or company already exist?
	if($userModel->isVerified($json->emailAddress) || $companyModel->companyExists($json->company)) return -1;
	
	// Create company
	$company = $companyModel->generateCompany($json);
	$json->companyID = $company->_id;
	unset($json->company);
	
	// Generate unique database identifier
	$databaseIdentifier = System::generateDatabaseIdentifier($json->companyID);
	
	// Update company with database identifier
	$companyModel->updateDatabaseIdentifier($json->companyID, $databaseIdentifier);
	
	// Create user account
	$userModel->registerUser($json);
	
	// Perform stripe charge and link stripe customer to company
	$payment = new Payment($app);
	$payment->setPlan($stripePlan);
	$payment->setToken($stripeToken);
	
	try {
		$customer = $payment->createStripeCustomer($payment->token, $json->_id, $payment->plan['id']);
	} catch(\Stripe_Error $e) {
		$body = $e->getJsonBody();
		return json_encode($body['error']);
	}

	// Send verification email
	mail($json->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to verify your user account: ".Config::DOMAIN."/verify/".$json->verify);
	
	return $customer->__toJSON();
});

// Verify user registration
$app->get('/verify/{token}', function(Request $request, Application $app, $token) {
	$userModel = new UserModel($app);
	$userModel->isVerified(null, $token);
	
	if(!isset($userModel->user)) return 'The verification code supplied was invalid.';	// Return error message to backbone
	
	// Set account as verified
	$userModel->verifyAccount($userModel->user['emailAddress']);
	
	// Load users company to get the database identifier
	$companyModel = new CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	
	System::setupSession($app, true, $companyModel->company['database'], (string) $userModel->user['_id'], (string) $userModel->user['companyID']);
	
	// Redirect to load authenticated assets
	return $app->redirect('/');
});