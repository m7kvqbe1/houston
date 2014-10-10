<?php
namespace Houston\Ticket\Model;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class TicketModel {		
	protected $app;

	public function __construct(Application $app) {
		$this->app = $app;
	}
}