<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get authenticated users companies
$app->get('/companies', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$userModel = new Houston\User\Model\UserModel($app);
	$userModel->loadUserByID($app['session']->get('u'));
	
	$companyModel = new Houston\Company\Model\CompanyModel($app);
	$companyModel->loadCompanyByID($userModel->user['companyID']);
	
	return json_encode($companyModel->company);
})->before($secure);

// Get clients
$app->get('/clients', function(Request $request, Application $app) {	
	$clientModel = new Houston\Client\Model\ClientModel($app);
	return $clientModel->getClients();
})->before($secure);

// Add new client
$app->post('/clients', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$clientModel = new Houston\Client\Model\ClientModel($app);
	$clientModel->addClient($json);
	
	return json_encode($json);
})->before($secure);

// Get users for client
$app->get('/client/users/{clientID}', function(Request $request, Application $app, $clientID) {
	$clientModel = new Houston\Client\Model\ClientModel($app);
	return json_encode($clientModel->getUsers($clientID));
})->before($secure);

// Add new user to client
$app->post('/user', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	return 'foo';
})->before($secure);

// Get agents
$app->get('/agents', function(Request $request, Application $app) {
	$userModel = new Houston\User\Model\UserModel($app);
	return $userModel->getAgents();
})->before($secure);

// Add new agent
$app->post('/agents', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$userModel = new Houston\User\Model\UserModel($app);
	$userModel->addAgent($json);
	
	// Send verification email
	mail($json->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to complete the registration process: ".Config::DOMAIN."/verify/".$json->verify);
	
	return 1;
})->before($secure);