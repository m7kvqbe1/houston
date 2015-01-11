<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

// Test IMAP mailbox connect
$app->get('/mailbox/test', function(Request $request, Application $app) {
	$mailbox = new Houston\Extra\Mailbox();
	$mailbox->getMail();
	
	return print_r($mailbox->emails, true);
})->before($secure);


// Scan mailbox
$app->get('/mailbox/scan', function(Request $request, Application $app) {
	$mailbox = new Houston\Extra\Mailbox();
	$mailbox->getMail();
	
	foreach($mailbox->emails as $email) {
		$ticketModel = new Houston\Ticket\Model\TicketModel();
		
		// Does a ticket already exists for this email (check custom headers)
		if(!$mailbox->getTicketID($email)) {
			//$ticketJSON = '{ "_id" : "", "url" : "/tickets/add", "status" : "New", "agent" : false, "files" : [ ], "hasMessages" : false, "updated" : [], "subject" : "", "message" : "", "id" : "", "avatar" : "", "username" : "", "name" : "", "date" : "" }';
			//$ticket = json_decode($ticketJSON);
			
			$ticket = new stdClass();
			$ticket->subject = $email['subject'];
			$ticket->message = $email['message'];
			$ticket->date = $email['date']; // Needs formatting
			$ticket->name = $email['from'];
			$ticket->username = $email['fromAddress'];
			
			// Check to see if user account with email address already exists
			$userModel = new Houston\User\Model\UserModel();
			
			try {
				$userModel->loadUser($email);
			} catch(Exception $e) {
				// User not found so save new user
				$user = new stdClass();
				$user->emailAddress = $email['fromAddress'];
				$userModel->addUser($user);
			}
			
			// Save new ticket to database
			$ticketModel->add($ticket);
			
			continue;
		} else {
			// Add reply to ticket
		}
		
		unset($ticketModel);
	}
	
	return print_r($mailbox->emails, true);
})->before($secure);