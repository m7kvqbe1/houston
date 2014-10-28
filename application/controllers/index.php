<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

// Serve initial assets
//$app->get('/', 'Houston\Common\Common::generateAssets');

$app->get('/', function(Request $request, Application $app){
	$userModel = new Houston\User\Model\UserModel($app);
	
	$cookies = $request->cookies;		
	$remember = $cookies->get('remember');
	var_dump($remember);
	
	if($userModel->rememberMe(null, $remember)) {
		// Authenticate session
		//$app['session']->set('u', $userModel->user['_id']);
	    //$app['session']->set('isAuthenticated', false);
	}
	
	return Houston\Common\Common::generateAssets($request, $app);
});