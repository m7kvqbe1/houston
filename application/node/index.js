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

// Serve assets to client for Socket
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/notification/default.html');
});

// Broadcast new ticket event
app.get('/newticket', function(req, res) {
	console.log('newticket');
	io.emit('event-newticket', 'New Ticket');
	
	res.end();
});

// Broadcast reply event
app.get('/reply', function(req, res) {
	console.log('reply');
	io.emit('event-reply', 'New Reply');
	
	res.end();
});

// Broadcast status event
app.get('/status', function(req, res) {
	console.log('status');
	io.emit('event-status', 'Status Update');
	
	res.end();
});