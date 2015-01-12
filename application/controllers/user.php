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

// Remove user
$app->delete('/user/{userID}', function(Request $request, Application $app, $userID) {
	$userModel = new UserModel($app);
	$userModel->removeUser($userID);
	
	return 1;
})->before($secure);