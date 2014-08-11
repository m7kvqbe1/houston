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

// New code!
$app->post('/tickets/add', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});

$app->put('/tickets/add', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	var_dump($json);
});