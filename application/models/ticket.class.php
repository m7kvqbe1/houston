<?php
namespace Houston\Ticket\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class TicketModel {		
	protected $app;
	public $ticket;

	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function loadTicketByID($id) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
				
		$this->ticket = $db->tickets->findOne(array('_id' => new \MongoId($id)));
		if(!empty($this->ticket)) { 
			return $this->ticket;
		} else {
			throw new \Exception('Ticket not found');
		}
	}
	
	public function unsetTicket() {
		unset($this->ticket);
	}
	
	public function getAll() {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$tickets = $db->tickets;
		$result = $tickets->find();
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		$docs = json_encode($docs);
		
		return $docs;
	}
		
	public function add($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {
			$tickets = $db->tickets;
			$tickets->save($json);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function edit($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$json = str_replace('$', '', $json);
		$json = json_decode($json);	
		
		unset($json->_id);
		
		try {	
			$id = new MongoID($json->id);
			
			$tickets = $db->tickets;
			$tickets->update(array('_id' => $id), $json);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function getReplies($ticketID) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$collection = $db->replies;
		$result = $collection->find(array('ticketID' => $ticketID));
		
		$docs = array();
		foreach($result as $doc) {
		    array_push($docs, $doc);
		}
		
		$docs = json_encode($docs);
		
		return $docs;
	}
	
	public function reply($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		try {	
			$collection = $db->replies;
			$collection->save($json);
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function uploadAttachment($json) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		// Remove MimeType from start of Base64 encoded binary string
		$data = explode(',', $json->target);
		$data = $data[1];
		
		try {	
			$gridfs = $db->getGridFS();
			return $gridfs->storeBytes(base64_decode($data), array('contentType' => $json->type, 'fileName' => $json->name, 'lastModifiedDate' => $json->lastModifiedDate));
		} catch(MongoConnectionException $e) {
			die('Error connecting to MongoDB server');
		} catch(MongoException $e) {
			die('Error: '.$e->getMessage());
		}
	}
	
	public function downloadAttachment($id = null, $filename = null) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
			
		$gridfs = $db->getGridFS();	
		$file = $gridfs->findOne(array('_id' => new \MongoId($id)));
		
		$fileArr = array(
			'data' => $file->getBytes(),
			'fileName' => $file->file['fileName'],
			'contentType' => $file->file['contentType'],
			'lastModifiedDate' => $file->file['lastModifiedDate']
		); 
		
		return $fileArr;
	}
	
	public function getFileMeta($fileIDs = array()) {
		$connections = $this->app['mongo'];
		$db = $connections['default'];
		$db = $db->houston;
		
		$fileArr = array();
		foreach($fileIDs as $fileID) {
			$gridfs = $db->getGridFS();
			$file = $gridfs->findOne(array('_id' => new \MongoId($fileID)));
			
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