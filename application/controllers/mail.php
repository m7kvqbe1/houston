<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app->get('/mailbox/test', function(Request $request, Application $app) {
	$mailbox = new Houston\Extra\Mailbox();
	$mailbox->getMail();
	
	print_r($mailbox->emails);
	
	return 1;
});