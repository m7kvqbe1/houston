<?php
namespace Houston\Tickets\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class TicketsController {
	public function test() {
		return 'TicketsController';
	}
		
	public function getTickets($user = null) {
		// Temporary return dummy tickets
		$tickets = file_get_contents(DOCUMENT_ROOT.'/tmp/data/tickets.json');
		return $tickets;		
	}
}