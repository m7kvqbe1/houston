<?php
namespace Houston\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Component\MailboxExtended as Mailbox;
use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;
use Houston\Model\UserModel;

class MailController {
	protected $app;
	
	public function __construct(Application $app) 
	{
		$this->app = $app;
	}
	
	public function mailboxTestAction() 
	{
		$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
		$mailbox->getMail();
	
		return print_r($mailbox->emails, true);
	}
	
	public function mailboxTestGenerateAction() 
	{
		$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
		$mailbox->getMail();
	
		return $mailbox->generateInfoHtml('t-2837982734982734', 'm-2837982734982734');	
	}
	
	public function mailboxScanAction()
	{
		$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
		$mailbox->getMail();
		
		// Tally import result
		$status = new \stdClass();
		$status->newTickets = 0; 
		$status->newReplies = 0;
		
		foreach($mailbox->emails as $email) {
			$ticketID = $mailbox->getMessageMeta($email['messageBody'], 'ticket-id');
			$messageID = $mailbox->getMessageMeta($email['messageBody'], 'message-id');
			$message = $mailbox->extractMessage($email['messageBody']);
			
			if(isset($ticketID)) {
				// Skip iteration if ticket doesn't exist
				$ticketModel = new TicketModel($this->app);
				try {
					$ticketModel->loadTicketByID($ticketID);	
				} catch(Exception $e) {
					continue;
				}
				
				// Generate reply
				$replyModel = new ReplyModel($this->app);
				try {
					$replyModel->generateReply($ticketID, $message, null, $email['fromAddress']);
				} catch(Exception $e) {
					// User not found only registered users may reply to a ticket
					return $e->getMessage();
				}
				
				// Save reply to system
				$replyModel->reply($replyModel->reply);
				
				// Send new reply email to all agents
				$userModel = new UserModel($this->app);
				$agents = $userModel->getUsersByRole('AGENT');
				
				foreach($agents as $agent) {
					$mailbox->loadTemplate('reply');
				}
				
				// Send new reply email to ticket sender
				
				$status->newReplies++;
			} else {			
				// Generate new ticket and save it
				$ticketModel = new TicketModel($this->app);
				
				$ticketModel->generateTicket($email['subject'], strip_tags($email['messageBody']), $email['date'], $email['fromAddress'], $email['firstName'], $email['lastName']);
				$ticketModel->add($ticketModel->ticket);
				
				// Send new ticket emails to all agents
				$userModel = new UserModel($this->app);
				$agents = $userModel->getUsersByRole('AGENT');
				
				foreach($agents as $agent) {
					$mailbox->loadTemplate('new');
				}
				
				// Send new ticket email to ticket sender
				
				$status->newTickets++;
			}
				
			unset($ticketModel);
		}
		
		return json_encode($status);	
	}
}