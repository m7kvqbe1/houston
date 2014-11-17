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
	
	public function add() {
		
	}
	
	public function edit() {
		
	}
	
	public function getReplies() {
		
	}
	
	public function reply() {
		
	}
}