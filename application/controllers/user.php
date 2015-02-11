<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\UserModel;
use Houston\Model\CompanyModel;

// Get authenticated session user object
$app->get('/user/self', function(Request $request, Application $app) {	
	$userModel = new UserModel($app);
	$userModel->loadUserByID($app['session']->get('uid'));
	
	// Add company name to user JSON returned to backbone
	$companyModel = new CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	$userModel->user['companyName'] = $companyModel->company['companyName'];
	
	if(!isset($userModel->user)) return -1;
	
	unset($userModel->user['password']);
	
	return json_encode($userModel->user);
})->before($secure);

// Get all users for authenticated sessions company
$app->get('/users', function(Request $request, Application $app) {
	$userModel = new UserModel($app);
	$users = $userModel->getAllUsers();
	
	return json_encode($users);
})->before($secure);

// Delete user
$app->delete('/user/{userID}', function(Request $request, Application $app, $userID) {
	$userModel = new UserModel($app);
	$userModel->removeUser($userID);
	
	return 1;
})->before($secure);

// Update user account property
$app->put('/user/update/{userID}/{property}', function(Request $request, Application $app, $userID, $property) {
	$data = json_decode(file_get_contents('php://input'));
	
	try {
		$userModel = new UserModel($app);
		$userModel->setProperty($userID, $property, $data);	
	} catch(Exception $e) {
		echo $e->getMessage();
	}	
})->before($secure);

// Delete user account property
$app->delete('/user/delete/{userID}/{property}', function(Request $request, Application $app, $userID, $property) {
	$data = json_decode(file_get_contents('php://input'));
	
	try {
		$userModel = new UserModel($app);
		$userModel->deleteProperty($userID, $property);
	} catch(Exception $e) {
		echo $e->getMessage();
	}
})->before($secure);