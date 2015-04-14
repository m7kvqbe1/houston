<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Houston\Component\Helper;

class TicketModel
{
	protected $app;
	public $ticket;

	public function __construct(Application $app, $ticketID = null)
	{
        $this->app = $app;

		if(isset($ticketID)) $this->loadTicketByID($ticketID);
	}

	public function loadTicketByID($ticketID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		$ticketID = new \MongoID($ticketID);

		$this->ticket = $db->tickets->findOne(array('_id' => $ticketID));

		if(!empty($this->ticket)) {
			return $this->ticket;
		} else {
			throw new \Exception('Ticket not found');
		}
	}

	public function getAll()
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		$tickets = $db->tickets;
		$result = $tickets->find();

		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}

		return $docs;
	}

	public function generateTicket($subject, $message, $date = null, $email, $firstName = null, $lastName = null)
	{
		$this->ticket = new \stdClass();

		$this->ticket->subject = $subject;
		$this->ticket->message = $message;
		$this->ticket->date = (isset($date)) ? $date : Helper::convertTimestamp(date('Y-m-d H:i:s'));
		$this->ticket->status = 'New';

		// Check to see if user account with email address already exists
		$userModel = new UserModel($this->app);

		try {
			$userModel->loadUser($email);
		} catch(\Exception $e) {
			// User not found so save new user
			$user = new \stdClass();
			$user->emailAddress = $email;
			$user->firstName = $firstName;
			$user->lastName = $lastName;

			$userModel->addUser($user);

			// Load the new user we created
			$userModel->loadUser($email);
		}

		$this->ticket->authorID = new \MongoID($userModel->user['_id']);

		return $this->ticket;
	}

	public function add($ticket)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		// Add date to ticket at point of save
		if(!isset($ticket->date)) $ticket->date = Helper::convertTimestamp(date('Y-m-d H:i:s'));

		// Increment and get/set ticket reference
		$companyModel = new CompanyModel($this->app, $this->app['session']->get('cid'));

		$ticket->reference = (isset($companyModel->company['ticketCount'])) ? $companyModel->company['ticketCount'] : 0;
		$ticket->reference++;

		// Update company ticketCount tally property
		$companyModel->setProperty(null, 'ticketCount', $ticket->reference);

		// Make sure author ID is MongoID object
		$ticket->authorID = new \MongoID($ticket->authorID);

		try {
			// Save ticket to database
			$tickets = $db->tickets;
			$tickets->save($ticket);
			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function edit($ticket)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		try {
			$id = new \MongoID($ticket->id);

			$tickets = $db->tickets;
			$tickets->update(array('_id' => $id), $ticket);
			return $ticket;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function delete($ticketID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		$ticketID = new \MongoID($ticketID);

		try {
			$collection = $db->tickets;
			$collection->remove(array('_id' => $ticketID));
			return true;
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function uploadAttachment($attachment)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		// Remove MimeType from start of Base64 encoded binary string
		$data = explode(',', $attachment->target);
		$data = $data[1];

		try {
			$gridfs = $db->getGridFS();
			return $gridfs->storeBytes(base64_decode($data), array('contentType' => $attachment->type, 'fileName' => $attachment->name, 'lastModifiedDate' => $attachment->lastModifiedDate));
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function downloadAttachment($fileID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		$gridfs = $db->getGridFS();
		$file = $gridfs->findOne(array('_id' => new \MongoID($fileID)));

		if(!isset($file)) return false;

		$fileArr = array(
			'data' => $file->getBytes(),
			'fileName' => $file->file['fileName'],
			'contentType' => $file->file['contentType'],
			'lastModifiedDate' => $file->file['lastModifiedDate']
		);

		return $fileArr;
	}

	public function deleteAttachment($fileID)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		try {
			$gridfs = $db->getGridFS();
			return $gridfs->remove(array('_id' => new \MongoID($fileID)));
		} catch(\MongoException $e) {
			$this->app['airbrake']->notifyOnException($e);
			return false;
		}
	}

	public function getFileMeta(Array $fileIDs)
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->{$this->app['session']->get('database')};

		$fileArr = array();
		foreach($fileIDs as $fileID) {
			$gridfs = $db->getGridFS();
			$file = $gridfs->findOne(array('_id' => new \MongoID($fileID)));

			$meta = array(
				'_id' => $fileID,
				'fileName' => $file->file['fileName'],
				'contentType' => $file->file['contentType'],
				'lastModifiedDate' => $file->file['lastModifiedDate']
			);

			array_push($fileArr, $meta);
		}

		if(empty($fileArr)) {
			return false;
		} else {
			return $fileArr;
		}
	}
}
