<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Silex\Application;

use Houston\Component\ApiResponse;
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
		$response = ($tickets = $ticketModel->getAll()) ? json_encode($tickets) : ApiResponse::error('TICKET_NOT_FOUND');
		
		return $response;
	}
	
	public function getTicketAction($ticketID) 
	{
		$ticketModel = new TicketModel($this->app);
		
		try {
			$ticket = $ticketModel->loadTicketByID($ticketID);
			return json_encode($ticket);
		} catch(Exception $e) {
			return ApiResponse::error('TICKET_NOT_FOUND');
		}
	}
	
	public function postTicketAction() 
	{
		$ticket = json_decode(file_get_contents('php://input'));
	
		$ticketModel = new TicketModel($this->app);
		
		if($ticketModel->add($ticket)) {
			Notify::socketBroadcast('/new/ticket', $ticket, $this->app['session']->get('cid'));	
			return json_encode($ticket);
		} else {
			return ApiResponse::error('TICKET_ADD_FAIL');
		}
	}
	
	public function putTicketAction() {
		$ticket = file_get_contents('php://input');
		
		$ticketModel = new TicketModel($this->app);
		if($ticketModel->edit($ticket)) {
			return json_encode($ticket);	
		} else {
			return ApiResponse::error('TICKET_EDIT_FAIL');
		}
	}
	
	public function postReplyAction($ticketID) {
		$reply = json_decode(file_get_contents('php://input'));
		
		$reply->ticketID = $ticketID;
		
		$replyModel = new ReplyModel($this->app);
		
		if($replyModel->reply($reply)) {
			Notify::socketBroadcast('/new/reply', $reply, $this->app['session']->get('cid'));
			return json_encode($reply);
		} else {
			return ApiResponse::error('REPLY_FAIL');
		}
	}
	
	public function getRepliesAction($ticketID) {
		$ticket = json_decode(file_get_contents('php://input'));
		
		$replyModel = new ReplyModel($this->app);	
		$response = ($replies = $replyModel->getReplies($ticketID)) ? json_encode($replies) : ApiResponse::error('REPLIES_NOT_FOUND');
		
		return $response;
	}
	
	public function getAttachmentMetaAction($fileID) {
		$ticketModel = new TicketModel($this->app);
		$response = ($meta = $ticketModel->getFileMeta($fileID)) ? json_encode($meta) : ApiResponse::error('FILE_NOT_FOUND');
		
		return $response;
	}
	
	public function postAttachmentAction() {
		$ticket = json_decode(file_get_contents('php://input'));
		
		$ticketModel = new TicketModel($this->app);
		$response = ($id = $ticketModel->uploadAttachment($ticket)) ? json_encode(array('_id' => $id)) : ApiResponse::error('FILE_UPLOAD_FAIL');
		
		return $response; 
	}
	
	public function getAttachmentAction($fileID) {
		$ticketModel = new TicketModel($this->app);
		$file = $ticketModel->downloadAttachment($fileID);
		
		if(!file) return ApiResponse::error('FILE_NOT_FOUND');
		
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
		
		return ($response['ok']) ? ApiResponse::success('DEFAULT_RESPONSE_SUCCESS') : ApiResponse::error('ATTACHMENT_DELETE_FAIL');
	}
}