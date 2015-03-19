<?php
use Silex\Application;

use Houston\Controller\TicketController;

$app['ticket.controller'] = $app->share(function() use ($app) {
	return new TicketController($app);
});

$app->get('/api/tickets', 'ticket.controller:getTicketsAction')->before($secure);

$app->get('/api/tickets/{ticketID}', 'ticket.controller:getTicketAction')->before($secure);

$app->post('/api/tickets', 'ticket.controller:postTicketAction')->before($secure);

$app->put('/api/tickets/{ticketID}', 'ticket.controller:putTicketAction')->before($secure);

$app->put('/api/tickets/update/status', 'ticket.controller:putTicketStatusUpdate')->before($secure);

$app->put('/api/tickets/update/assignee', 'ticket.controller:putTicketAssigneeUpdate')->before($secure);

$app->post('/api/tickets/reply/{ticketID}', 'ticket.controller:postReplyAction')->before($secure);

$app->get('/api/tickets/reply/{ticketID}', 'ticket.controller:getRepliesAction')->before($secure);

$app->get('/api/tickets/file/meta/{fileID}', 'ticket.controller:getAttachmentMetaAction')->before($secure);

$app->post('/api/tickets/file', 'ticket.controller:postAttachmentAction')->before($secure);

$app->post('/api/tickets/file/zip', 'ticket.controller:getAttachmentsZipAction')->before($secure);

$app->get('/api/tickets/file/{fileID}', 'ticket.controller:getAttachmentAction')->before($secure);

$app->get('/api/tickets/file/inline/{fileID}', 'ticket.controller:getAttachmentInlineAction')->before($secure);

$app->delete('/api/tickets/file/{fileID}', 'ticket.controller:deleteAttachmentAction')->before($secure);