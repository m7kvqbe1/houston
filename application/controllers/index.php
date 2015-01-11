<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Common\System;
use Houston\Model\UserModel;

// Serve initial assets
$app->get('/', function(Request $request, Application $app){
	$userModel = new UserModel($app);
	
	$cookies = $request->cookies;		
	$token = $cookies->get('r');
	
	$remember = (is_null($token)) ? false : $userModel->rememberMeLookup($token);
	if($remember !== false) {
		// Authenticate session
		$app['session']->set('u', $remember['_id']);
	    $app['session']->set('isAuthenticated', true);
	}
	
	return System::generateAssets($request, $app);
});