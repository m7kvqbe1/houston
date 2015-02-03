<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;
use Houston\Model\UserModel;
use Houston\Extra\MailboxExtended as Mailbox;

// IMAP mailbox connect test
$app->get('/mailbox/test', function(Request $request, Application $app) {
	$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
	$mailbox->getMail();
	
	return print_r($mailbox->emails, true);
})->before($secure);

// Method test
$app->get('/mailbox/test/generate', function(Request $request, Application $app) {
	$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
	$mailbox->getMail();
	
	return $mailbox->generateInfoHtml('t-2837982734982734', 'm-2837982734982734');
	//<span class="ticket-id" style="color: #fff;">t-2837982734982734</span><span class="message-id" style="color: #fff;">m-2837982734982734</span>
})->before($secure);

// Scan mailbox
$app->get('/mailbox/scan', function(Request $request, Application $app) {
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
			// Add reply to relevant ticket and save it
			$replyModel = new ReplyModel($app);
			$replyModel->generateReply($ticketID, $message, $email['from'][0].' '.$email['from'][1]);
			$replyModel->reply($replyModel->reply);
			
			// Get all Agent email addresses
			$userModel = new UserModel($app);
			$userModel->getAgents();
			
			// Generate email
			$mailbox->loadTemplate('reply');
			
			// Send new reply email to all agents
			
			// Send new reply email to ticket sender
			
			$status->newReplies++;
		} else {			
			// Generate new ticket and save it
			$ticketModel = new TicketModel($app);
			$ticketModel->generateTicket($email['from'][0], $email['from'][1], $email['subject'], strip_tags($email['messageBody']), $email['date'], $email['fromAddress']);
			$ticketModel->add($ticketModel->ticket);
			
			// Get all Agent email addresses
			$userModel = new UserModel($app);
			$userModel->getAgents();
			
			// Generate email
			$mailbox->loadTemplate('new');
			
			// Send new ticket emails to all agents
			
			// Send new ticket email to ticket sender
			
			$status->newTickets++;
		}
			
		unset($ticketModel);
	}
	
	return json_encode($status);
})->before($secure);