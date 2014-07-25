<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Login to system
$app->post('/auth/login', function(Request $request, Application $app) {
	$user = new Houston\User\Model\UserModel();

	session_start();

	$auth = array(
		'username' => 'houston',
		'password' => 'password'
	);
	
	$json = json_decode(file_get_contents('php://input'));
	
	if($json->user === $auth['username'] && $json->password === $auth['password']) {
		$app['session']->set('isAuthenticated', true);
		
		return 1;
	} else {
		return -1;
	}
});

// Logout of system
$app->get('/auth/logout', function(Request $request, Application $app){
	$app['session']->set('isAuthenticated', false);
	return $app->redirect('/');
});