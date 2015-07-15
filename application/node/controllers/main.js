var express = require('express');
var auth = require('../components/auth.js');
var helper = require('../components/helper.js');
var router = express.Router();

var Routes = function(namespaces) {
	// New ticket
	router.post('/new/ticket', auth.secureRoute, function(req, res) {
		var message = helper.trimMessage(req.body.message);
		
		var payload = {
			ticketId: req.body._id.$id,
			message: message
		}
	
		namespaces[req.body.socketNamespace].emit('notify', payload);
		res.end();
	});
	
	// New reply
	router.post('/new/reply', auth.secureRoute, function(req, res) {
		var message = helper.trimMessage(req.body.message);
		
		var payload = {
			ticketId: req.body._id.$id,
			message: message
		}
	
		namespaces[req.body.socketNamespace].emit('notify', payload);
		res.end();
	});
	
	// Status update
	router.post('/update/status', auth.secureRoute, function(req, res) {
		var status = req.body.status;
		var subject = helper.trimMessage(req.body.subject);
		
		var payload = {
			ticketId: req.body._id.$id,
			status: status,
			subject: subject
		}
	
		namespaces[req.body.socketNamespace].emit('notify', payload);
		res.end();
	});
	
	// Assignee update
	router.post('/update/assignee', auth.secureRoute, function(req, res) {
		var status = req.body.status;
		var subject = helper.trimMessage(req.body.subject);
		
		var payload = {
			ticketId: req.body._id.$id,
			status: status,
			subject: subject
		}
	
		namespaces[req.body.socketNamespace].emit('notify', payload);
		res.end();
	});
	
	// User / client update
	router.post('/update/users', auth.secureRoute, function(req, res) {
		namespaces[req.body.socketNamespace].emit('update', 'users');
		res.end();
	});
	
	return router;
}

module.exports = Routes;