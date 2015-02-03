<?php
namespace Houston\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class TicketModel 
{
	protected $app;
	public $ticket;

	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function loadTicketByID($id) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		$this->ticket = $db->tickets->findOne(array('_id' => new \MongoID($id)));
		
		if(!empty($this->ticket)) {			
			return $this->ticket;
		} else {
			throw new \Exception('Ticket not found');
		}
	}
	
	public function generateTicket($firstName, $lastName, $subject, $message, $date, $email) 
	{
		$this->ticket = new \stdClass();
		
		$this->ticket->subject = $subject;
		$this->ticket->message = $message;
		$this->ticket->date = $date;
		
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
		$this->ticket->authorRole = $userModel->user['role'];
		
		return $this->ticket;
	}
	
	public function getAll() 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$tickets = $db->tickets;
		$result = $tickets->find();
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		return $docs;
	}
		
	public function add($ticket) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {
			$tickets = $db->tickets;
			$tickets->save($ticket);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function edit($json) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$json = str_replace('$', '', $json);
		$ticket = json_decode($json);	
		
		unset($ticket->_id);
		
		try {	
			$id = new \MongoID($ticket->id);
			
			$tickets = $db->tickets;
			$tickets->update(array('_id' => $id), $ticket);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function delete($ticketID) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$ticketID = new \MongoID($ticketID);
		
		try {	
			$collection = $db->tickets;
			$collection->remove(array('_id' => $ticketID));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function uploadAttachment($attachment) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Remove MimeType from start of Base64 encoded binary string
		$data = explode(',', $attachment->target);
		$data = $data[1];
		
		try {	
			$gridfs = $db->getGridFS();
			return $gridfs->storeBytes(base64_decode($data), array('contentType' => $attachment->type, 'fileName' => $attachment->name, 'lastModifiedDate' => $attachment->lastModifiedDate));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function downloadAttachment($id = null, $filename = null) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
			
		$gridfs = $db->getGridFS();	
		$file = $gridfs->findOne(array('_id' => new \MongoID($id)));
		
		$fileArr = array(
			'data' => $file->getBytes(),
			'fileName' => $file->file['fileName'],
			'contentType' => $file->file['contentType'],
			'lastModifiedDate' => $file->file['lastModifiedDate']
		); 
		
		return $fileArr;
	}
	
	public function deleteAttachment($id) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {
			$gridfs = $db->getGridFS();
			return $gridfs->remove(array('_id' => new \MongoID($fileID)));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function getFileMeta($fileIDs = array()) 
	{
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
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

		return $fileArr;
	}
}