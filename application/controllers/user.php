<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\UserModel;

// Get user object
$app->get('/user/self', function(Request $request, Application $app) {	
	$userModel = new UserModel($app);
	$userModel->loadUserByID($app['session']->get('u'));
	
	if(!isset($userModel->user)) return -1;
	
	unset($userModel->user['password']);
	
	return json_encode($userModel->user);
})->before($secure);

// Delete user
$app->delete('/user/{userID}', function(Request $request, Application $app, $userID) {
	$userModel = new UserModel($app);
	$userModel->removeUser($userID);
	
	return 1;
})->before($secure);

// Update user account property
$app->post('/user/update/{userID}/{property}', function(Request $request, Application $app, $userID, $property) {
	$data = json_decode(file_get_contents('php://input'));
	
	try {
		$userModel = new UserModel($app);
		$userModel->setProperty($userID, $property, $data);	
	} catch(Exception $e) {
		// Invalid property
		echo $e->getMessage();
	}	
	
	return 'foo';
})->before($secure);

// Delete user account property
$app->delete('/user/delete/{userID}/{property}', function(Request $request, Application $app, $userID, $property) {
	try {
		$userModel = new UserModel($app);
		$userModel->deleteProperty($userID, $property);
	} catch(Exception $e) {
		// Invalid property
		echo $e->getMessage();
	}
})->before($secure);