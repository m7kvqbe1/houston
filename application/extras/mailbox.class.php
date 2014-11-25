<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class Mailbox {
	public $inbox;
	public $emails;
	
	public function __construct() {
		try {
			$this->connect();	
		} catch(Exception $e) {
			echo $e->getMessage();
		}
	}
	
	public function connect() {
		return $this->inbox = imap_open(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
	}
	
	public function disconnect() {
		imap_close($this->inbox);		
	}
	
	public function getMail() {
		$emails = imap_search($this->inbox, 'ALL');
		foreach($emails as $num) {
			$overview = '';
			$message = '';
		}
		
		return $this->emails;
	}
	
	public function markRead() {
		
	}
	
	public function markUnread() {
		
	}
}