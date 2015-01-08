<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

// Serve initial assets
$app->get('/', function(Request $request, Application $app){
	$userModel = new Houston\User\Model\UserModel($app);
	
	$cookies = $request->cookies;		
	$token = $cookies->get('r');
	
	$remember = (is_null($token)) ? false : $userModel->rememberMeLookup($token);
	if($remember !== false) {
		// Authenticate session
		$app['session']->set('u', $remember['_id']);
	    $app['session']->set('isAuthenticated', true);
	}
	
	return Houston\Common\System::generateAssets($request, $app);
});