<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

// DEPRECATED
//$app->get('/', 'Houston\Common\Common::generateAssets');

// Serve initial assets
$app->get('/', function(Request $request, Application $app){
	$userModel = new Houston\User\Model\UserModel($app);
	
	$cookies = $request->cookies;		
	$token = $cookies->get('r');
	
	//var_dump($token);
	//var_dump($app['session']->get('isAuthenticated'));
	
	$remember = (is_null($token)) ? false : $userModel->rememberMeLookup($token);	
	if($remember) {
		// Authenticate session
	    $app['session']->set('isAuthenticated', true);
	}
	
	return Houston\Common\Common::generateAssets($request, $app);
});