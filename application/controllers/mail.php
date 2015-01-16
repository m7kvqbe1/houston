<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\TicketModel;
use Houston\Model\ReplyModel;
use Houston\Extra\MailboxExtended as Mailbox;

// Test IMAP mailbox connect
$app->get('/mailbox/test', function(Request $request, Application $app) {
	$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
	$mailbox->getMail();
	
	return print_r($mailbox->emails, true);
})->before($secure);


// Scan mailbox
$app->get('/mailbox/scan', function(Request $request, Application $app) {
	$mailbox = new Mailbox(\Config::MAILBOX_HOST, \Config::MAILBOX_USER, \Config::MAILBOX_PASSWORD);
	$mailbox->getMail();
	
	foreach($mailbox->emails as $email) {
		if(empty($email['customHeaders']['ticketID'])) {
			// Generate new ticket and save it
			$ticketModel = new TicketModel($app);
			$ticketModel->generateTicket($email['subject'], $email['message'], $email['date'], $email['fromAddress']);
			$ticketModel->add($ticketModel->ticket);			
			continue;
		} else {
			// Add reply to relevant ticket
			$replyModel = new ReplyModel($app);
			$replyModel->generateReply();
			continue;
		}
		
		unset($ticketModel);
	}
	
	return 'foo';
})->before($secure);