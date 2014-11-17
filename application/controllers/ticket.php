<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get all tickets
$app->get('/tickets/all', function(Request $request, Application $app) {
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	return $ticket->getAll();
});

// Add new ticket
$app->post('/tickets/add', function(Request $request, Application $app) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->add($json);
		
	$notify = new \Houston\Extra\Notify($app); 
	$notify->newTicket($json);
	
	return json_encode($json);
});

// Edit ticket
$app->put('/tickets/add/{ticketID}', function(Request $request, Application $app) {	
	$json = file_get_contents('php://input');
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->edit($json);
	
	return json_encode($json);
});

// Add new reply
$app->post('/tickets/reply/add/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$json->ticketID = $ticketID;
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->reply($json);
	
	$notify = new \Houston\Extra\Notify($app); 
	$notify->newReply($json);	

	return json_encode($json);
});

// Get replies
$app->get('/tickets/reply/get/{ticketID}', function(Request $request, Application $app, $ticketID) {
	$connections = $app['mongo'];
	$db = $connections['default'];
	$db = $db->houston;
	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	return $ticket->getReplies($ticketID);
});