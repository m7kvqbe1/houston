// Setup express
var app = require('express')();

// Setup bodyParser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Setup server
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load custom modules
var helper = require('./helper.js');
var db = require('./database.js');

// Listening for sockets
http.listen(3000, function(){ console.log('listening on *:3000'); });

// Listening on socket
io.on('connection', function(socket){
	socket.on('response', function(data) {
		// Output response from client server side
		console.log(data);
	});
});

// Get all company IDs from MongoDB
db.getAllCompanyIds(function(companyIds) {
	console.log(companyIds);	
});

// Broadcast new ticket event
app.post('/new/ticket', function(req, res) {	
	console.log(req.body);
	
	var msg = req.body.message;
	msg = helper.trimMessage(msg);
	
	io.emit('notify', '<a href="/#/tickets/'+req.body.ticketID+'"><strong>New Ticket:</strong>&nbsp;'+msg+'</a>');
	res.end();
});

// Broadcast new reply event
app.post('/new/reply', function(req, res) {
	console.log(req.body);

	var msg = req.body.message;
	msg = helper.trimMessage(msg);

	io.emit('notify', '<a href="/#/tickets/'+req.body.ticketID+'"><strong>New Reply:</strong>&nbsp;'+msg+'</a>');
	res.end();
});