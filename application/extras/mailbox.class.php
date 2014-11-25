<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class Mailbox {
	public $inbox;
	public $emails = array();
	
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
			$overview = imap_fetch_overview($this->inbox, $num, 0);
			
			$email['read'] = ($overview[0]->seen ? 'read' : 'unread');
			$email['subject'] = $overview[0]->subject;
			$email['from'] = $overview[0]->from;
			$email['date'] = $overview[0]->date;
			$email['message'] = imap_fetchbody($this->inbox, $num, 1);
			
			array_push($this->emails, $email);
		}
		
		return $this->emails;
	}
	
	public function markRead() {
		
	}
	
	public function markUnread() {
		
	}
}