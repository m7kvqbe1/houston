<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

abstract class Mailbox {
	protected $inbox;
	public $emails = array();
	
	public function __construct($host = null, $username = null, $password = null) {
		try {
			$this->connect($host, $username, $password);
		} catch(Exception $e) {
			echo $e->getMessage();
		}
	}
	
	public function connect($host, $username, $password) {
		return $this->inbox = imap_open($host, $username, $password);
	}
	
	public function disconnect() {
		imap_close($this->inbox);		
	}
	
	public function getMail() {
		$emails = imap_search($this->inbox, 'ALL');
		foreach($emails as $num) {
			$header = imap_headerinfo($this->inbox, $num);
			$overview = imap_fetch_overview($this->inbox, $num, 0);
			$structure = imap_fetchstructure($this->inbox, $num);
			
			$email['read'] = ($overview[0]->seen ? 'read' : 'unread');
			$email['subject'] = $overview[0]->subject;
			$email['from'] = $overview[0]->from;
			$email['date'] = $overview[0]->date;	
			$email['message'] = ($this->checkType($structure) ? imap_fetchbody($this->inbox, $num, 1) : $email['message'] = imap_body($this->inbox, $num));
			$email['fromAddress'] = $header->from[0]->mailbox . "@" . $header->from[0]->host;
			$email['ticketID'] = $this->getTicketID($header);
			
			$this->markRead($num);
						
			array_push($this->emails, $email);
		}
		
		return $this->emails;
	}
	
	public function checkType($structure) {
		if($structure->type == 1) return true;
		return false;
	}
	
	public function markRead($num) {
		return imap_setflag_full($this->inbox, $num, '\\Seen \\Flagged');
	}
	
	public function markUnread($num) {
		return imap_clearflag_full($this->inbox, $num, '\\Seen');
	}
	
	public function sendEmail() {
		// Send new email using Swiftmailer library
	}
}

class MailboxExtended extends Mailbox {
	public function getTicketID($header) {
		return (isset($header->ticketID) ? $header->ticketID : null);
	}
	
	public function setTicketID() {
		// Set custom email header for ticket ID
	}
	
	public function generateEmail() {
		// Generate email from HTML template
	}	
}