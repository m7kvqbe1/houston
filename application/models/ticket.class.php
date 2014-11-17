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
		
		$criteria = array('_id' => $id);
		$this->user = $db->tickets->findOne($criteria);
		if(!empty($this->ticket)) { 
			return $this->ticket;
		} else {
			throw new Exception('Ticket not found.');
		}
	}
	
	public function unsetTicket() {
		unset($this->ticket);
	}
	
	public function getAll() {
		
	}
	
	public function get($ticketID) {
		
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
	
	public function getReplies() {
		
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
	
	public function uploadAttachment() {
		
	}
	
	public function downloadAttachment() {
		
	}
}