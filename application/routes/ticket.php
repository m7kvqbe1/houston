<?php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Silex\Application;

use Houston\Component\Notify;
use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;

// Get all tickets
$app->get('/tickets', function(Request $request, Application $app) {
	$ticketModel = new TicketModel($app);
	return json_encode($ticketModel->getAll());
})->before($secure);

// Get ticket
$app->get('/tickets/{ticketID}', function(Request $request, Application $app, $ticketID) {
	$ticketModel = new TicketModel($app);
	return json_encode($ticketModel->loadTicketByID($ticketID));
})->before($secure);

// Add new ticket
$app->post('/tickets', function(Request $request, Application $app) {	
	$ticket = json_decode(file_get_contents('php://input'));
	
	$ticketModel = new TicketModel($app);
	$ticketModel->add($ticket);
		
	Notify::socketBroadcast('/new/ticket', $ticket, $app['session']->get('cid'));
	
	return json_encode($ticket);
})->before($secure);

// Edit ticket
$app->put('/tickets/{ticketID}', function(Request $request, Application $app) {	
	$ticket = file_get_contents('php://input');
	
	$ticketModel = new TicketModel($app);
	$ticketModel->edit($ticket);
	
	return json_encode($ticket);
})->before($secure);

// Add new reply
$app->post('/tickets/reply/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$reply = json_decode(file_get_contents('php://input'));
	
	$reply->ticketID = $ticketID;
	
	$replyModel = new ReplyModel($app);
	$replyModel->reply($reply);
	
	Notify::socketBroadcast('/new/reply', $reply, $app['session']->get('cid'));

	return json_encode($reply);
})->before($secure);

// Get replies
$app->get('/tickets/reply/{ticketID}', function(Request $request, Application $app, $ticketID) {	
	$ticket = json_decode(file_get_contents('php://input'));
	
	$replyModel = new ReplyModel($app);
	
	return json_encode($replyModel->getReplies($ticketID));
})->before($secure);

// Get attachment meta
$app->get('/tickets/file/meta/{fileID}', function(Request $request, Application $app, $fileID) {	
	$ticketModel = new TicketModel($app);
	$meta = $ticketModel->getFileMeta($fileID);
	
	return json_encode($meta);
})->before($secure);

// Upload attachment
$app->post('/tickets/file', function(Request $request, Application $app) {
	$ticket = json_decode(file_get_contents('php://input'));
	
	$ticketModel = new TicketModel($app);
	$id = $ticketModel->uploadAttachment($ticket);
	
	return json_encode(array('_id' => $id));
})->before($secure);

// Download attachment
$app->get('/tickets/file/{fileID}', function(Request $request, Application $app, $fileID) {
	$ticketModel = new TicketModel($app);
	$file = $ticketModel->downloadAttachment($fileID);
	
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
	$ticketModel = new TicketModel($app);
	$response = $ticketModel->deleteAttachment($fileID);
	return $response['ok'];
})->before($secure);