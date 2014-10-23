<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Logout of system
$app->get('/auth/logout', function(Request $request, Application $app){
	$app['session']->set('isAuthenticated', false);
	return $app->redirect('/');
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
	
	// Do password hashes match?
	if($userModel::hashPassword($json->password) === $userModel->user['password']) {
	    $app['session']->set('u', $userModel->user['_id']);
	    $app['session']->set('isAuthenticated', true);
	} else {
	    return -1;
	}
	
	return 1;
});

// Register new user
$app->post('/auth/register', function(Request $request, Application $app) {
	$userModel = new Houston\User\Model\UserModel($app);
	
	session_start();
	
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	// Check if user or company exists
	$criteria = array('emailAddress' => $json->emailAddress);
	$users = $db->users->findOne($criteria);
	
	$criteria = array('company' => $json->company);
	$company = $db->users->findOne($criteria);
	
	if(!empty($users) || !empty($company)) {
	    return -1;
	}

	// Hash password
	$json->password = $userModel::hashPassword($json->password);
	
	// Generate email verification token
	$json->verify = $userModel::generateVerificationToken($json->emailAddress);

	// Save user to database
	try {
		$collection = $db->users;
	    $collection->save($json);
	} catch(MongoConnectionException $e) {
	    die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
	    die('Error: '.$e->getMessage());
	}
		
	// Create company
	$companyJSON = '{"companyName": "", "users": [{"name": ""}]}';
	$company = json_decode($companyJSON);
	
	$company->companyName = $json->company;
	$company->users[0]->name = $json->firstName.' '.$json->lastName;
	
	try {
		$collection = $db->companies;
		$collection->save($company);		
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
	
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

// Get user object
$app->get('/user/self', function(Request $request, Application $app) {	
	$userModel = new Houston\User\Model\UserModel($app);
	$userModel->loadUserByID($app['session']->get('u'));
	
	if(!isset($userModel->user)) return -1;
	
	unset($userModel->user['password']);
	return json_encode($userModel->user);
});