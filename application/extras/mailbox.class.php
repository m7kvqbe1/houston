<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class Mailbox {
	protected $inbox;
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
			$structure = imap_fetchstructure($this->inbox, $num);
			
			$email['read'] = ($overview[0]->seen ? 'read' : 'unread');
			$email['subject'] = $overview[0]->subject;
			$email['from'] = $overview[0]->from;
			$email['date'] = $overview[0]->date;	
			$email['message'] = ($this->checkType($structure) ? imap_fetchbody($this->inbox, $num, 1) : $email['message'] = imap_body($this->inbox, $num));			
			
			array_push($this->emails, $email);
		}
		
		return $this->emails;
	}
	
	public function checkType($structure) {
		if($structure->type == 1) return true;
		return false;
	}
	
	public function markRead() {
		
	}
	
	public function markUnread() {
		
	}
}