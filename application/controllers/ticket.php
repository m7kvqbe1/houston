<?php
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

// Get all tickets
$app->get('/tickets/all', function(Request $request, Application $app) {
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	return $ticket->getAll();
})->before($secure);

// Add new ticket
$app->post('/tickets/add', function(Request $request, Application $app) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->add($json);
		
	$notify = new \Houston\Extra\Notify($app); 
	$notify->newTicket($json);
	
	return json_encode($json);
})->before($secure);

// Edit ticket
$app->put('/tickets/add/{ticketID}', function(Request $request, Application $app) {	
	$json = file_get_contents('php://input');
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->edit($json);
	
	return json_encode($json);
})->before($secure);

// Add new reply
$app->post('/tickets/reply/add/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$json->ticketID = $ticketID;
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$ticket->reply($json);
	
	$notify = new \Houston\Extra\Notify($app); 
	$notify->newReply($json);	

	return json_encode($json);
})->before($secure);

// Get replies
$app->get('/tickets/reply/get/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	return $ticket->getReplies($ticketID);
})->before($secure);

// Upload attachment
$app->post('/tickets/file/add', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	return $ticket->uploadAttachment($json);
})->before($secure);

// Download attachment
$app->get('/tickets/file/download/{fileID}', function(Request $request, Application $app, $fileID) {
	$ticket = new \Houston\Ticket\Model\TicketModel($app);
	$file = $ticket->downloadAttachment($fileID);
	
	return print_r($file, true);;
})->before($secure);