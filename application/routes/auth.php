<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Login to system
$app->post('/auth/login', function(Request $request, Application $app) {
	$user = new Houston\User\Model\UserModel();

	session_start();
	
	$json = json_decode(file_get_contents('php://input'));
	
	$m = new MongoClient("mongodb://localhost");
	$db = $m->houston;
	
	$criteria = array('emailAddress' => $json->user);
	$doc = $db->users->findOne($criteria);
	
	if(!empty($doc)) {
		if($json->password === $doc['password']) {
			$app['session']->set('isAuthenticated', true);
			return 1;
		}
	}
	
	return -1;
});

// Logout of system
$app->get('/auth/logout', function(Request $request, Application $app){
	$app['session']->set('isAuthenticated', false);
	return $app->redirect('/');
});

// Register new user
$app->post('/auth/register', function(Request $request, Application $app) {
	$user = new Houston\User\Model\UserModel();
	
	session_start();
	
	$json = json_decode(file_get_contents('php://input'));
	
	// Setup MongoDB
	$m = new MongoClient("mongodb://localhost");
	$db = $m->houston;
	
	// Check if user exists and save to database
	try {
		$criteria = array('emailAddress' => $json->emailAddress);
		$doc = $db->users->findOne($criteria);
		
		if(!empty($doc)) {
			return -1;
		} else {
			$collection = $db->users;
			$collection->save($json);
		}
		
		$m->close();
		
		$app['session']->set('isAuthenticated', true);
		
		return 1;
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
});