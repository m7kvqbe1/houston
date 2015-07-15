<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Component\MailboxExtended as Mailbox;
use Houston\Model\TicketModel;

class MailController 
{
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function mailboxTestAction() 
	{
		$mailbox = new Mailbox($this->app, MAILBOX_HOST, MAILBOX_USER, MAILBOX_PASSWORD);
		$mailbox->getMail();
	
		return print_r($mailbox->emails, true);
	}
	
	public function mailboxScanAction()
	{
		$mailbox = new Mailbox($this->app, MAILBOX_HOST, MAILBOX_USER, MAILBOX_PASSWORD);
		$mailbox->getMail();
		
		// Lookup the company database associated with this mailbox
		// Hardcoded for now until account admin area is created
		// Mailboxes will be associated with companies
		$database = 'db_e1fb6783e91bd863e16e26d5a84b1f26';
		
		// Tally import status
		$status = new \stdClass();
		$status->newTickets = 0; 
		$status->newReplies = 0;
		
		foreach($mailbox->emails as $email) {
			$ticketID = $mailbox->getMessageMeta($email['messageBody'], 'ticket-id');
			$messageID = $mailbox->getMessageMeta($email['messageBody'], 'message-id');
			$message = $mailbox->extractMessage($email['messageBody']);
						
			if(isset($ticketID) && $ticketID !== false) {
				$ticketModel = new TicketModel($this->app);
				try {
					$ticketModel->loadTicketByID($ticketID);
					$mailbox->processReplyEmail($email, $ticketID, $messageID, $message);	
				} catch(\Exception $e) {
					// Skip this iteration if the seed ticket doesn't exist, user not found or other error processing reply
					continue;
				}			
				
				$status->newReplies++;
			} else {
				try {
					$mailbox->processNewTicketEmail($email);	
				} catch(\Exception $e) {
					// Skip this iteration if problem processing new ticket
					continue;
				}
				
				$status->newTickets++;
			}
				
			unset($ticketModel);
		}
		
		return json_encode($status);	
	}
}