<?php
$app->get('/tickets', function() {
	$tickets = new Houston\Tickets\Controller\TicketsController();
	return $tickets->getTickets();
});

$app->get('/tickets/{method}', function(Silex\Application $app, $method) {
	// Instantiate controller
    $tickets = new Houston\Tickets\Controller\TicketsController();
    
    // Check if method exists
    if(method_exists($user, $method)) {
    	// Call method dynamically based on route
		return $user->{$method}('Arg');
    }    
});