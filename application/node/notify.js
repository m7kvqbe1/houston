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
app.post('/new/ticket', function(req, res) {	
	var msg = req.body.message;
	msg = helper.trimMessage(msg);
	
	namespaces[req.body.socketNamespace].emit('notify', '<a href="/#/tickets/'+req.body.ticketID.$id+'"><strong>New Ticket:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});

// Broadcast new reply notification event to the appropriate socket namespace
app.post('/new/reply', function(req, res) {
	console.log(req.body);
	
	var msg = req.body.message;
	msg = helper.trimMessage(msg);
	
	namespaces[req.body.socketNamespace].emit('notify', '<a href="/#/tickets/'+req.body.ticketID.$id+'"><strong>New Reply:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});