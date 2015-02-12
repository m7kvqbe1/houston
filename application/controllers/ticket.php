<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Silex\Application;

use Houston\Component\Notify;
use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;

class TicketController
{
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function getTicketsAction() 
	{
		$ticketModel = new TicketModel($this->app);
		return json_encode($ticketModel->getAll());
	}
	
	public function getTicketAction($ticketID) 
	{
		$ticketModel = new TicketModel($this->app);
		return json_encode($ticketModel->loadTicketByID($ticketID));
	}
	
	public function postTicketAction() 
	{
		$ticket = json_decode(file_get_contents('php://input'));
	
		$ticketModel = new TicketModel($this->app);
		$ticketModel->add($ticket);
				
		Notify::socketBroadcast('/new/ticket', $ticket, $this->app['session']->get('cid'));
			
		return json_encode($ticket);
	}
	
	public function putTicketAction() {
		$ticket = file_get_contents('php://input');
		
		$ticketModel = new TicketModel($this->app);
		$ticketModel->edit($ticket);
		
		return json_encode($ticket);		
	}
	
	public function postReplyAction($ticketID) {
		$reply = json_decode(file_get_contents('php://input'));
		
		$reply->ticketID = $ticketID;
		
		$replyModel = new ReplyModel($this->app);
		$replyModel->reply($reply);
		
		Notify::socketBroadcast('/new/reply', $reply, $this->app['session']->get('cid'));
		
		return json_encode($reply);		
	}
	
	public function getRepliesAction($ticketID) {
		$ticket = json_decode(file_get_contents('php://input'));
		
		$replyModel = new ReplyModel($this->app);
		
		return json_encode($replyModel->getReplies($ticketID));		
	}
	
	public function getAttachmentMetaAction($fileID) {
		$ticketModel = new TicketModel($this->app);
		$meta = $ticketModel->getFileMeta($fileID);
		
		return json_encode($meta);		
	}
	
	public function postAttachmentAction() {
		$ticket = json_decode(file_get_contents('php://input'));
		
		$ticketModel = new TicketModel($this->app);
		$id = $ticketModel->uploadAttachment($ticket);
		
		return json_encode(array('_id' => $id));		
	}
	
	public function getAttachmentAction($fileID) {
		$ticketModel = new TicketModel($this->app);
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
	}
	
	public function deleteAttachmentAction($fileID) {
		$ticketModel = new TicketModel($this->app);
		$response = $ticketModel->deleteAttachment($fileID);
		return $response['ok'];		
	}
}