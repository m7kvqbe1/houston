<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app->get('/mailbox/test', function(Request $request, Application $app) {
	$mailbox = new Houston\Extra\Mailbox();
	$mailbox->getMail();
	
	return print_r($mailbox->emails, true);
});