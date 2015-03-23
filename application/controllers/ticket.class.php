<?php
namespace Houston\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Silex\Application;

use Houston\Component\ApiResponse;
use Houston\Component\Notify;
use Houston\Component\Helper;
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

		if($tickets = $ticketModel->getAll()) {
			return json_encode($tickets);
		} else {
			return ApiResponse::error('TICKET_NOT_FOUND');
		}
	}

	public function getTicketAction($ticketID)
	{
		$ticketModel = new TicketModel($this->app);

		try {
			$ticket = $ticketModel->loadTicketByID($ticketID);
			return json_encode($ticket);
		} catch(\Exception $e) {
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

	public function putTicketAction()
	{
		$ticket = json_decode(file_get_contents('php://input'));

		$ticketModel = new TicketModel($this->app);
		if($ticketModel->edit($ticket)) {
			return json_encode($ticket);
		} else {
			return ApiResponse::error('TICKET_EDIT_FAIL');
		}
	}

	public function putTicketStatusUpdate()
	{
		$ticket = json_decode(file_get_contents('php://input'));

		$ticketModel = new TicketModel($this->app);
		if($ticketModel->edit($ticket)) {
			Notify::socketBroadcast('/assignee/update', $ticket, $this->app['session']->get('cid'));
			return json_encode($ticket);
		} else {
			return ApiResponse::error('TICKET_EDIT_FAIL');
		}
	}

	public function putTicketAssigneeUpdate() {
		$ticket = json_decode(file_get_contents('php://input'));

		$ticketModel = new TicketModel($this->app);
		if($ticketModel->edit($ticket)) {
			Notify::socketBroadcast('/status/update', $ticket, $this->app['session']->get('cid'));
			return json_encode($ticket);
		} else {
			return ApiResponse::error('TICKET_EDIT_FAIL');
		}
	}

	public function postReplyAction($ticketID)
	{
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

	public function getRepliesAction($ticketID)
	{
		$ticket = json_decode(file_get_contents('php://input'));

		$replyModel = new ReplyModel($this->app);

		return json_encode($replyModel->getReplies($ticketID));
	}

	public function getAttachmentMetaAction($fileID)
	{
		$ticketModel = new TicketModel($this->app);

		if($meta = $ticketModel->getFileMeta($fileID)) {
			return json_encode($meta);
		} else {
			return ApiResponse::error('FILE_NOT_FOUND');
		}
	}

	public function postAttachmentAction()
	{
		set_time_limit(0);

		$ticket = json_decode(file_get_contents('php://input'));

		$ticketModel = new TicketModel($this->app);

		if($id = $ticketModel->uploadAttachment($ticket)) {
			return json_encode(array('_id' => $id));
		} else {
			return ApiResponse::error('FILE_UPLOAD_FAIL');
		}
	}

	public function getAttachmentAction($fileID)
	{
		$ticketModel = new TicketModel($this->app);
		$file = $ticketModel->downloadAttachment($fileID);

		if(!$file) return ApiResponse::error('FILE_NOT_FOUND');

		$response = new Response();
		$response->setContent($file['data']);
		$response->headers->set('Content-Type', $file['contentType']);
		$response->headers->set('Content-Transfer-Encoding', 'Binary');
		$response->headers->set('Content-Length', strlen($file['data']));
		$response->headers->set('Expires', '0');

		$d = $response->headers->makeDisposition(
			ResponseHeaderBag::DISPOSITION_ATTACHMENT,
			$file['fileName']
		);
		$response->headers->set('Content-Disposition', $d);

		return $response;
	}

	public function getAttachmentInlineAction($fileID)
	{
		$ticketModel = new TicketModel($this->app);
		$file = $ticketModel->downloadAttachment($fileID);

		if(!$file) return ApiResponse::error('FILE_NOT_FOUND');

		$response = new Response();
		$response->setContent($file['data']);
		$response->headers->set('Content-Type', $file['contentType']);
		$response->headers->set('Content-Transfer-Encoding', 'Binary');
		$response->headers->set('Content-Length', strlen($file['data']));
		$response->headers->set('Expires', '0');

		return $response;
	}

	public function getAttachmentsZipAction(Request $request) {
		$fileIDs = $request->query->get('id');

		$ticketModel = new TicketModel($this->app);

		$files = array();
		foreach($fileIDs as $fileID) {
			try {
				array_push($files, $ticketModel->downloadAttachment($fileID));
			} catch(\Exception $e) {
				continue;
			}
		}

		if(empty($files)) return ApiResponse::error('FILE_NOT_FOUND');

		$filename = Helper::createZipArchive($files);
		$data = file_get_contents($filename);

		$response = new Response();
		$response->setContent($data);
		$response->headers->set('Content-Type', 'application/zip');
		$response->headers->set('Content-Transfer-Encoding', 'Binary');
		$response->headers->set('Content-Length', filesize($filename));
		$response->headers->set('Expires', '0');

		$d = $response->headers->makeDisposition(
			ResponseHeaderBag::DISPOSITION_ATTACHMENT,
			'houston-attachments-archive.zip'
		);
		$response->headers->set('Content-Disposition', $d);

		// Remove temporary archive from filesystem
		unlink($filename);

		return $response;
	}

	public function deleteAttachmentAction($fileID)
	{
		$ticketModel = new TicketModel($this->app);
		$response = $ticketModel->deleteAttachment($fileID);

		if($response['ok']) {
			return ApiResponse::success('DEFAULT_RESPONSE_SUCCESS');
		} else {
			return ApiResponse::error('ATTACHMENT_DELETE_FAIL');
		}
	}
}
