<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get authenticated users companies
$app->get('/companies/all', function(Request $request, Application $app) {
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