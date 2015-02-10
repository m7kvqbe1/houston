<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Cookie;

use Houston\Common\System;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;
use Houston\Extra\Payment;

// Logout of system
$app->get('/auth/logout', function(Request $request, Application $app){	
	$response = Response::create('', 302, array("Location" => "/"));
	$response->headers->clearCookie('r');
	
	$app['session']->set('u', '');
	$app['session']->set('isAuthenticated', false);

	return $response;
});

// Login to system
$app->post('/auth/login', function(Request $request, Application $app) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	$userModel->loadUser($json->user);
		
	// Does verified user exist?
	if(!$userModel->isVerified($json->user)) {
	    return -1;
	}
	
	// Do password hashes match or remember token match?
	if($userModel::hashPassword($json->password) === $userModel->user['password']) {
		// Register default database connection
		$companyModel = new CompanyModel($app);
		$companyModel->loadCompanyByID($userModel->user['companyID']);
		
		/*$mongoFactory = $app['mongo.factory'];
		$connections = $app['mongo'];
		$connections['default'] = $mongoFactory('mongodb://'.Config::MONGO_USER.':'.Config::MONGO_PASSWORD.'@'.Config::MONGO_HOST, array('connect' => true));*/
				
		$app['session']->set('database', $companyModel->company['database']);
	    $app['session']->set('u', $userModel->user['_id']);
	    $app['session']->set('isAuthenticated', true);
	} else {
	    return -1;
	}
	
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
	
	// Authenticate session
	$app['session']->set('u', $userModel->user['_id']);
	$app['session']->set('isAuthenticated', true);
	
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
	
	// Perform stripe charge
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
	
	// Return stripe customer gubbins - do something with this - DO NOT RETURN TO CLIENT
	return $customer->__toJSON();
});

// Verify user registration
$app->get('/verify/{token}', function(Request $request, Application $app, $token) {
	$userModel = new UserModel($app);
	$userModel->isVerified(null, $token);
	
	if(!isset($userModel->user)) return 'The verification code supplied was invalid.';	// Update to redirect to invalid token error page
	
	// Set account as verified
	$userModel->verifyAccount($userModel->user['emailAddress']);
	
	// Authenticate session
	$app['session']->set('u', $userModel->user['_id']);
	$app['session']->set('isAuthenticated', true);
	
	// Redirect to load authenticated assets
	return $app->redirect('/');
});