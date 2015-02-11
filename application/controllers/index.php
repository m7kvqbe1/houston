<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Common\System;
use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

// Serve initial assets
$app->get('/', function(Request $request, Application $app) {
	$userModel = new UserModel($app);
	
	$cookies = $request->cookies;		
	$token = $cookies->get('r');
	
	$remember = (is_null($token)) ? false : $userModel->rememberMeLookup($token);
	if($remember !== false) {
		// Load users company to get the database identifier
		$companyModel = new CompanyModel($app);
		$companyModel->loadCompanyByID($remember['companyID']);
		
		// Authenticate session
		System::setupSession($app, true, $companyModel->company['database'], (string) $remember['_id'], (string) $remember['companyID']);
	}
	
	return System::generateAssets($request, $app);
});