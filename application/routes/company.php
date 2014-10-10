<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get all tickets
$app->get('/companies/all', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	try {
	    $companies = $db->companies;
	    $result = $companies->find();
	    
	    $docs = array();
	    foreach($result as $doc) {
		    array_push($docs, $doc);
	    }
	    
	    $docs = json_encode($docs);
	    
	    return $docs;
	} catch(MongoConnectionException $e) {
	    die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
	    die('Error: '.$e->getMessage());
	}
});