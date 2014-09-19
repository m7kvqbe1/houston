<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Deprecated!
/*$app->get('/tickets/{method}', function(Silex\Application $app, $method) {
	// Instantiate controller
    $tickets = new Houston\Ticket\Model\TicketModel();
    
    // Check if method exists
    if(method_exists($user, $method)) {
    	// Call method dynamically based on route
		return $user->{$method}('Arg');
    }
});*/

// Get all tickets
$app->get('/tickets/all', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	try {
	    $tickets = $db->tickets;
	    $result = $tickets->find();
	    
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

// Add new ticket
$app->post('/tickets/add', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	try {
		$tickets = $db->tickets;
		$tickets->save($json);
		
		return json_encode($json);
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
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
		//unset($json->id);
		
		$tickets = $db->tickets;
		$tickets->update(array('_id' => $id), $json);
		
		return json_encode($json);
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
});

// Get ticket
$app->get('/tickets/{ticketID}', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});

// Get all tickets
$app->get('/tickets/all', function(){
	return 'test';
});