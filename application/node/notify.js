// Setup express
var app = require('express')();

// Setup bodyParser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Setup server
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	socket.on('response', function(data) {
		// Output response from client server side
		console.log(data);
	});
});

function trimMessage(str) {
	if(str.length > 30) {
		msg = str.substr(0, 30);
		return msg+'...';		
	}
	return str;
}

// Broadcast new ticket event
app.post('/new/ticket', function(req, res) {	
	console.log(req.body);
	
	var msg = req.body.message;
	msg = trimMessage(msg);
	
	io.emit('notify', '<a href="/#/tickets/'+req.body.ticketID+'"><strong>New Ticket:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});

// Broadcast new reply event
app.post('/new/reply', function(req, res) {
	console.log(req.body);

	var msg = req.body.message;
	msg = trimMessage(msg);
	
	console.log(req.body.id);

	io.emit('notify', '<a href="/#/tickets/'+req.body.ticketID+'"><strong>New Reply:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});

// Broadcast status update event
app.post('/new/status', function(req, res) {
	console.log(req.body);
	var msg = 'test';
	
	io.emit('notify', '<a href="/#/tickets/'+req.body.ticketID+'"><strong>Status Update:</strong>&nbsp;'+msg+'</a>');
	
	res.end();
});