<?php
namespace Houston\Extra;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

abstract class Mailbox {
	protected $inbox;
	protected $host;
	protected $username;
	protected $password;
	protected $serverEncoding;
	
	public $emails = array();
	
	public function __construct($host = null, $username = null, $password = null, $serverEncoding = 'utf-8') {
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->serverEncoding = $serverEncoding;
		
		try {
			$this->connect($this->host, $this->username, $this->password);
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
		$emails = imap_search($this->inbox, 'ALL', null, $this->serverEncoding);
		foreach($emails as $num) {
			$header = imap_headerinfo($this->inbox, $num);
			$overview = imap_fetch_overview($this->inbox, $num, 0);
			$structure = imap_fetchstructure($this->inbox, $num);
			
			$email['read'] = ($overview[0]->seen ? 'read' : 'unread');
			$email['subject'] = $overview[0]->subject;
			$email['from'] = explode(' ', $overview[0]->from, 2);
			$email['date'] = Helper::convertTimestamp($overview[0]->date);
			$email['messageBody'] = imap_fetchbody($this->inbox, $num, 1); //($this->checkType($structure) ? imap_fetchbody($this->inbox, $num, 1) : $email['messageBody'] = imap_body($this->inbox, $num));
			$email['fromAddress'] = $header->from[0]->mailbox . '@' . $header->from[0]->host;
			
			$this->markRead($num);
						
			array_push($this->emails, $email);
		}
		
		return $this->emails;
	}
	
	public function checkType($structure) {
		if($structure->type == 1) return true;
		return false;
	}
	
	public function getHeader($header, $name) {
		return (isset($header->{$name}) ? $header->{$name} : null);
	}
	
	public function markRead($num) {
		return imap_setflag_full($this->inbox, $num, '\\Seen \\Flagged');
	}
	
	public function markUnread($num) {
		return imap_clearflag_full($this->inbox, $num, '\\Seen');
	}
	
	public function sendEmail($to, $from, $content, $attachments = array(), $headers = array()) {
		// Send new email using Swiftmailer library
	}
}

class MailboxExtended extends Mailbox {
	private $template;
	
	public function __construct($host, $username, $password, $templateName = null) {
		parent::__construct($host, $username, $password);
		
		if(isset($templateName)) $this->template = $this->loadTemplate($templateName);
	}
	
	public function generateTemplate() {
		$template = str_replace('{reply_chain}', $this->generateReplyHtml(), $this->template);
		$template = str_replace('{ticket_info_hidden}', $this->generateInfoHtml(), $this->template);
		
		return $template;
	}
	
	public function loadTemplate($templateName) {
		switch($templateName) {
			case 'reply':
				$filename = 'reply.html';
				break;
			
			case 'new':
				$filename = 'new_ticket.html';
				break;
				
			default:
				throw new \Exception('Template unavailable');
		}
			
		$this->template = file_get_contents(DOCUMENT_ROOT.'/application/assets/email/'.$filename);
	}
	
	private function generateReplyHtml() {
		// Generate reply markup to inject into HTML email template
	}
	
	private function generateInfoHtml($ticketID, $messageID) {
		// Generate hidden ticket info to inject into HTML email template
		return '<span class="ticket-id" style="color: #fff;">'.$ticketID.'</span><span class="message-id" style="color: #fff;">'.$messageID.'</span>';
	}
	
	public function getMessageMeta($message, $className) {		
		var_dump($message);
		
		$dom = new \DOMDocument();
		$dom->loadHTML($message);
		$xpath = new \DOMXPath($dom);
		$results = $xpath->query("//*[@class='" . $className . "']");
		
		if($results->length > 0) {
		    return $results->item(0)->nodeValue;
		}
	}
	
	public function extractMessage($emailBody) {
		$emailBody = trim(strip_tags($emailBody));
		return current(explode("--- Please type your reply above this line ---", $emailBody));
	}
}