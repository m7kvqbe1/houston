<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

use Houston\Model\UserModel;
use Houston\Model\ClientModel;
use Houston\Model\CompanyModel;

// Get authenticated users company
$app->get('/companies', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$userModel = new UserModel($app);
	$userModel->loadUserByID($app['session']->get('u'));
	
	$companyModel = new CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	
	return json_encode($companyModel->company);
})->before($secure);

// Get clients
$app->get('/clients', function(Request $request, Application $app) {	
	$clientModel = new ClientModel($app);
	return json_encode($clientModel->getClients());
})->before($secure);

// Add new client
$app->post('/clients', function(Request $request, Application $app) {
	$client = json_decode(file_get_contents('php://input'));
	
	$clientModel = new ClientModel($app);
	$clientModel->addClient($client);
	
	return json_encode($client);
})->before($secure);

// Add new user to client
$app->post('/user', function(Request $request, Application $app) {
	$user = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	$userModel->addUser($user);
	
	return json_encode($user);
})->before($secure);

// Remove client and all associated users
$app->delete('/client/{clientID}', function(Request $request, Application $app, $clientID) {
	$clientModel = new ClientModel($app);
	$clientModel->removeClient($clientID);
	
	return 1;
})->before($secure);

// Add new agent
$app->post('/agents', function(Request $request, Application $app) {
	$agent = json_decode(file_get_contents('php://input'));
	
	$userModel = new UserModel($app);
	$userModel->addAgent($agent);
	
	// Send verification email
	mail($agent->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to complete the registration process: ".Config::DOMAIN."/verify/".$agent->verify);
	
	return 1;
})->before($secure);