var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/notification/default.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	socket.broadcast.emit('hello world');
	
	socket.on('message', function(msg) {
		console.log(msg);
		io.emit('message', 'monkey');
	});
});