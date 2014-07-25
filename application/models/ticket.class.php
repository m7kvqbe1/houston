<?php
namespace Houston\Ticket\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class TicketModel {		
	public function getTickets($username = null) {
		// Temporary return dummy tickets
		$tickets = file_get_contents(DOCUMENT_ROOT.'/tmp/data/tickets.json');
		return $tickets;		
	}
}