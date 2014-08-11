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
		$collection = $db->tickets;
		$collection->save($json);
		
		return 1;
	} catch(MongoConnectionException $e) {
		die('Error connecting to MongoDB server');
	} catch(MongoException $e) {
		die('Error: '.$e->getMessage());
	}
});

// Edit ticket
$app->put('/tickets/add', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});