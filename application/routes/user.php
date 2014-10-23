<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

// Get user object
$app->get('/user/self', function(Request $request, Application $app) {	
	$userModel = new Houston\User\Model\UserModel($app);
	$userModel->loadUserByID($app['session']->get('u'));
	
	if(!isset($userModel->user)) return -1;
	
	unset($userModel->user['password']);
	return json_encode($userModel->user);
});