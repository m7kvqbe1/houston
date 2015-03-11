// Setup express
var express = require('express');
var app = express();

// Setup bodyParser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Setup server
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load custom modules
var helper = require('./helper.js');
var db = require('./database.js');

// Basic HTTP authentication
var secureRoute = function(req, res, next) {
    var auth;

    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }
    
    if (!auth || auth[0] !== 'cd8aec6611227907a7260e280fc87361' || auth[1] !== '0ec138408802d5aca30112cbd48478c6') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Houston Support Desk"');
        res.end('Unauthorized');
    } else {
        next();
    }
};

// Listening for http on port 3000
http.listen(3000, function(){ console.log('listening on *:3000'); });

io.on('connection', function(socket){
	socket.on('response', function(data) {
		// Output response from client server side
		console.log(data);
	});
});

// Get all company IDs from MongoDB and create a new namespaced socket for each one
var namespaces = {};
db.getAllCompanyIds(function(err, companyIds) {	
	companyIds.forEach(function(val) {
		namespaces[val] = io.of('/'+val);
		namespaces[val].on('connection', function(socket) {
			console.log('client connected');
		});
	});
});

// Broadcast new ticket notification event to the appropriate socket namespace
app.post('/new/ticket', secureRoute, function(req, res) {	
	var msg = req.body.message;
	msg = helper.trimMessage(msg);
	
	namespaces[req.body.socketNamespace].emit('notify', '<a href="/tickets/'+req.body._id.$id+'"><strong>New Ticket:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});

// Broadcast new reply notification event to the appropriate socket namespace
app.post('/new/reply', secureRoute, function(req, res) {
	console.log(req.body);
	
	var msg = req.body.message;
	msg = helper.trimMessage(msg);
	
	namespaces[req.body.socketNamespace].emit('notify', '<a href="/tickets/'+req.body.ticketID.$id+'"><strong>New Reply:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});