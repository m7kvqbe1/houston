<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get all tickets
$app->get('/tickets/all', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$tickets = $db->tickets;
	$result = $tickets->find();
	
	$docs = array();
	foreach($result as $doc) {
	    array_push($docs, $doc);
	}
	
	$docs = json_encode($docs);
	
	return $docs;
});

// Add new ticket
$app->post('/tickets/add', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	try {
		$tickets = $db->tickets;
		$tickets->save($json);
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
	
	$notify = new Houston\Extra\Notify($app); 
	$notify->newTicket($json);
	
	return json_encode($json);
});

// Edit ticket
$app->put('/tickets/add/{ticketID}', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = file_get_contents('php://input');
	$json = str_replace('$', '', $json);
	$json = json_decode($json);	
	
	unset($json->_id);
	
	try {	
		$id = new MongoID($json->id);
		
		$tickets = $db->tickets;
		$tickets->update(array('_id' => $id), $json);
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
	
	return json_encode($json);
});

// Get ticket - DEPRECATED
$app->get('/tickets/{ticketID}', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});

// Add new reply
$app->post('/tickets/reply/{ticketID}', function(Request $request, Application $app, $ticketID) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	$json->ticketID = $ticketID;
	
	try {	
		$collection = $db->replies;
		$collection->save($json);
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
	
	$notify = new Houston\Extra\Notify($app); 
	$notify->newReply($json);	

	return json_encode($json);
});

// Get replies
$app->get('/tickets/reply/get/{ticketID}', function(Request $request, Application $app, $ticketID) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	try {	
		$collection = $db->replies;
		$result = $collection->find(array('ticketID' => $ticketID));
		
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