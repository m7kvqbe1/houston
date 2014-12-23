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

// Broadcast new ticket event
app.post('/new/ticket', function(req, res) {	
	var msg = req.body.subject.substr(0, 30);
	var msg = msg+'...';
	
	io.emit('notify', '<strong>New Ticket:</strong>&nbsp;'+msg);
	
	res.end();
});

// Broadcast new reply event
app.post('/new/reply', function(req, res) {
	console.log(req.body);
	
	var msg = req.body.message.substr(0, 30);
	var msg = msg+'...';
	
	io.emit('notify', '<strong>New Reply:</strong>&nbsp;'+msg);
	
	res.end();
});

// Broadcast status update event
app.post('/new/status', function(req, res) {
	var msg = 'test';
	
	io.emit('notify', '<strong>Status Update:</strong>&nbsp;'+msg);
	
	res.end();
});