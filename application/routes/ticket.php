<?php
use Silex\Application;

use Houston\Controller\TicketController;

$app['ticket.controller'] = $app->share(function() use ($app) {
	return new TicketController($app);
});

$app->get('/tickets', 'ticket.controller:getTicketsAction')->before($secure);

$app->get('/tickets/{ticketID}', 'ticket.controller:getTicketAction')->before($secure);

$app->post('/tickets', 'ticket.controller:postTicketAction')->before($secure);

$app->put('/tickets/{ticketID}', 'ticket.controller:putTicketAction')->before($secure);

$app->post('/tickets/reply/{ticketID}', 'ticket.controller:postReplyAction')->before($secure);

$app->get('/tickets/reply/{ticketID}', 'ticket.controller:getRepliesAction')->before($secure);

$app->get('/tickets/file/meta/{fileID}', 'ticket.controller:getAttachmentMetaAction')->before($secure);

$app->post('/tickets/file', 'ticket.controller:postAttachmentAction')->before($secure);

$app->get('/tickets/file/{fileID}', 'ticket.controller:getAttachmentAction')->before($secure);

$app->delete('/tickets/file/{fileID}', 'ticket.controller:deleteAttachmentAction')->before($secure);