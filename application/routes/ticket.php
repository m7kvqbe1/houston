<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Deprecated!
$app->get('/tickets', function() {
	$tickets = new Houston\Ticket\Model\TicketModel();
	return $tickets->getTickets();
});

$app->get('/tickets/{method}', function(Silex\Application $app, $method) {
	// Instantiate controller
    $tickets = new Houston\Ticket\Model\TicketModel();
    
    // Check if method exists
    if(method_exists($user, $method)) {
    	// Call method dynamically based on route
		return $user->{$method}('Arg');
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
$app->put('/tickets/edit/{ticketID}', function(Request $request, Application $app) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	die($json);
	
	try {
		$mongoID = new MongoID($json._id);
		
		
		$tickets = $db->tickets;
		$tickets->update({_id: $mongoID}, $json);
		
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
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});

