<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
	
class Notify {
	protected $app;
	
	public function __construct(Application $app) {
		$this->app = $app;
	}
	
	public function sendRequest($url, $ticket) {
		// Send HTTP request via cURL to Node.js server
		$ch = curl_init($url);
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    	
    	// Use HTTP Header authentication for Node.js server
    	//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    	//curl_setopt($ch, CURLOPT_USERPWD, $username.':'.$password);
		
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ticket));
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    	
    	$output = curl_exec($ch);
    	curl_close($ch);
		
		return $output;
	}
	
	public function newTicket($ticket) {
		$this->sendRequest('http://localhost:3000/new/ticket', $ticket);
	}
	
	public function newReply($ticket) {
		$this->sendRequest('http://localhost:3000/new/reply', $ticket);
	}
	
	public function newStatus($ticket) {
		$this->sendRequest('http://localhost:3000/new/status', $ticket);
	}
}