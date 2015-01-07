<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get authenticated users companies
$app->get('/companies', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	// Only get companies for your user
	$userModel = new Houston\User\Model\UserModel($app);
	$companyName = $userModel->getCompanyName($app['session']->get('u'));
	
	$criteria = array('companyName' => $companyName);
	$company = $db->companies->findOne($criteria);
	    	    	    
	return json_encode($company);
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
	mail($json->emailAddress, "Welcome to Houston!", "Welcome to Houston!\r\n\r\nPlease click the link to verify your user account: ".Config::DOMAIN."/verify/".$json->verify);
	
	return 1;
})->before($secure);