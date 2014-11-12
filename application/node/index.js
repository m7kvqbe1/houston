var app = require('express')();
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
	console.log('newticket');
	io.emit('notify', 'New Ticket');
	
	res.end();
});

// Broadcast reply event
app.post('/new/reply', function(req, res) {
	console.log('reply');
	io.emit('notify', 'New Reply');
	
	res.end();
});

// Broadcast status event
app.post('/new/status', function(req, res) {
	console.log('status');
	io.emit('notify', 'Status Update');
	
	res.end();
});