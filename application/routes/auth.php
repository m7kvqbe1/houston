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
	$userModel = new Houston\User\Model\UserModel($app);
	
	session_start();
	
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	// Check if user exists and password matches
	$criteria = array('emailAddress' => $json->user, 'verify' => true);
	$users = $db->users->findOne($criteria);
	
	
	// Does user exist?
	if(empty($users)) {
	    return -1;
	}
	
	// Do password hashes match?
	if($userModel::hashPassword($json->password) === $users['password']) {
	    $app['session']->set('u', $users['_id']);
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
	$userModel = new Houston\User\Model\UserModel($app);
	
	session_start();
	
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$criteria = array('verify' => $token);
	$users = $db->users->findOne($criteria);
	
	if(empty($users)) return -1;
	
	// Set account as verified
	$userModel->verifyAccount($users['emailAddress']);
				
	$app['session']->set('u', $users['_id']);
	$app['session']->set('isAuthenticated', true);
	
	return $app->redirect('/');
});

// Get user object
$app->get('/user/self', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$criteria = array('_id' => $app['session']->get('u'));
	$users = $db->users->findOne($criteria);
	
	if(empty($users)) {
	    return -1;
	}
	
	unset($users['password']);
	return json_encode($users);
});