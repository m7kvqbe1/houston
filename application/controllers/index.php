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
		System::setupSession($app, true, $companyModel->company['database'], (string) $remember['_id']);
	}
	
	return System::generateAssets($request, $app);
});