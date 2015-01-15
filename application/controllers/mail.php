<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

use Houston\Model\TicketModel;
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
		$ticketModel = new TicketModel($app);
		
		// Does a ticket already exists for this email (check custom headers)
		if(!$mailbox->getTicketID($email)) {
			// Generate new ticket
			$ticketModel->generateTicket($email['subject'], $email['message'], $email['date'], $email['fromAddress']);
			
			// Save new ticket to database
			$ticketModel->add($ticket);
			
			continue;
		} else {
			// Add reply to relevant ticket
			$ticketModel->generateReply();
			
			continue;
		}
		
		unset($ticketModel);
	}
	
	return print_r($mailbox->emails, true);
})->before($secure);