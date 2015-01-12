<?php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Silex\Application;

use Houston\Model\TicketModel;
use Houston\Extra\Notify;

// Get all tickets
$app->get('/tickets/all', function(Request $request, Application $app) {
	$ticket = new TicketModel($app);
	return json_encode($ticket->getAll());
})->before($secure);

// Get ticket
$app->get('/tickets/{ticketID}', function(Request $request, Application $app, $ticketID) {
	$ticket = new TicketModel($app);
	return json_encode($ticket->loadTicketByID($ticketID));
})->before($secure);

// Add new ticket
$app->post('/tickets', function(Request $request, Application $app) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new TicketModel($app);
	$ticket->add($json);
		
	$notify = new Notify($app); 
	$notify->newTicket($json);
	
	return json_encode($json);
})->before($secure);

// Edit ticket
$app->put('/tickets/{ticketID}', function(Request $request, Application $app) {	
	$json = file_get_contents('php://input');
	
	$ticket = new TicketModel($app);
	$ticket->edit($json);
	
	return json_encode($json);
})->before($secure);

// Add new reply
$app->post('/tickets/reply/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$json->ticketID = $ticketID;
	
	$ticket = new TicketModel($app);
	$ticket->reply($json);
	
	$notify = new Notify($app); 
	$notify->newReply($json);	

	return json_encode($json);
})->before($secure);

// Get replies
$app->get('/tickets/reply/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new TicketModel($app);
	return json_encode($ticket->getReplies($ticketID));
})->before($secure);

// Upload attachment
$app->post('/tickets/file/add', function(Request $request, Application $app) {
	$json = json_decode(file_get_contents('php://input'));
	
	$ticket = new TicketModel($app);
	$id = $ticket->uploadAttachment($json);
	
	return json_encode(array('_id' => $id));
})->before($secure);

// Download attachment
$app->get('/tickets/file/download/{fileID}', function(Request $request, Application $app, $fileID) {
	$ticket = new TicketModel($app);
	$file = $ticket->downloadAttachment($fileID);
	
	$response = new Response();
	$response->setContent($file['data']);
	$response->headers->set('Content-Type', $file['contentType']);
	$response->headers->set('Content-Transfer-Encoding', 'binary');
	$response->headers->set('Expires', '0');
	
	$d = $response->headers->makeDisposition(
    	ResponseHeaderBag::DISPOSITION_ATTACHMENT,
		$file['fileName']
	);
	$response->headers->set('Content-Disposition', $d);
	
	return $response;
})->before($secure);

// Delete attachment
$app->delete('/tickets/file/{fileID}', function(Request $request, Application $app, $fileID) {
	$ticket = new TicketModel($app);
	return $ticket->deleteAttachment($fileID);
})->before($secure);

// Get attachment meta
$app->get('/tickets/file/meta/{fileID}', function(Request $request, Application $app, $fileID) {	
	$ticket = new TicketModel($app);
	$meta = $ticket->getFileMeta($fileID);
	
	return json_encode($meta);
})->before($secure);