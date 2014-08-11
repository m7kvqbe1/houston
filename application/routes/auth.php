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
	$userModel = new Houston\User\Model\UserModel();
	
	session_start();
	
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	// Check if user exists and password matches
	try {
	    $criteria = array('emailAddress' => $json->user);
	    $users = $db->users->findOne($criteria);
	    
	    
	    // Does user exist?
	    if(empty($users)) {
			return -1;
	    }
	    
	    // Does password hashes match?
	    if($userModel::hashPassword($json->password) === $users['password']) {
	    	$app['session']->set('u', $users['_id']);
		    $app['session']->set('isAuthenticated', true);	
	    } else {
		    return -1;
	    }
	    
		return 1;
	} catch(MongoConnectionException $e) {
	    die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
	    die('Error: '.$e->getMessage());
	}
});

// Register new user
$app->post('/auth/register', function(Request $request, Application $app) {
	$userModel = new Houston\User\Model\UserModel();
	
	session_start();
	
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));

	// Hash password
	$json->password = $userModel::hashPassword($json->password);
	
	// Check if user exists and save to database
	try {
		$criteria = array('emailAddress' => $json->emailAddress);
		$users = $db->users->findOne($criteria);
	
	    if(!empty($users)) {
	    	return -1;
	    }
		
		$collection = $db->users;
	    $collection->save($json);
	    
	    // Validation email
	    mail($json->emailAddress, 'Welcome to Houston!', 'Welcome to Houston!');
	    
	    $app['session']->set('u', $users['_id']);
		$app['session']->set('isAuthenticated', true);
	    		    
	    return 1;
	} catch(MongoConnectionException $e) {
	    die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
	    die('Error: '.$e->getMessage());
	}
});

// Get user object
$app->get('/user/self', function(Request $request, Application $app, $userID) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;

	try {
		$criteria = array('_id' => $_SESSION['u']);
		$users = $db->users->findOne($criteria);
		
		if(empty($users)) {
			return -1;
		}
		
		unset($users['password']);
		return json_encode($users);	
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
});