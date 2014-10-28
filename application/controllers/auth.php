<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Cookie;

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
	session_start();
	
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new Houston\User\Model\UserModel($app);
	$userModel->loadUser($json->user);
		
	// Does verified user exist?
	if(!$userModel->isVerified($json->user)) {
	    return -1;
	}
	
	// Do password hashes match or remember token match?
	if($userModel::hashPassword($json->password) === $userModel->user['password']) {
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

// Register new user
$app->post('/auth/register', function(Request $request, Application $app) {
	session_start();
		
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new Houston\User\Model\UserModel($app);
	$companyModel = new Houston\Company\Model\CompanyModel($app);
	
	// Does verified user or company already exist?
	if($userModel->isVerified($json->emailAddress) || $companyModel->companyExists($json->company)) return -1;
	
	$userModel->registerUser($json);
	$companyModel->generateCompany($json);

	// Send verification email
	mail($json->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to verify your user account: http://tom.houston.com/verify/".$json->verify);
	
	return 1;
});

// Verify user registration
$app->get('/verify/{token}', function(Request $request, Application $app, $token) {
	session_start();
	
	$userModel = new Houston\User\Model\UserModel($app);
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