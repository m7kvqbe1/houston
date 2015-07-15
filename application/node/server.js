// Setup express
var express = require('express');
var app = express();

// Setup bodyParser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Setup server
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Require database component
var db = require('./components/database.js');

// Listening for http on port 3000
http.listen(3000, function() { 
	console.log('listening on *:3000'); 
});

// Log client WebSocket responses
io.on('connection', function(socket) {
	socket.on('response', function(data) {
		// Output response from client server side
		console.log(data);
	});
});

// Get all company IDs from MongoDB and create a WebSocket namespace for each one
var namespaces = {};
db.getAllCompanyIds(function(err, companyIds) {
	companyIds.forEach(function(val) {
		namespaces[val] = io.of('/'+val);
		namespaces[val].on('connection', function(socket) {
			console.log('client connected');
		});
	});
});

// Require routes and associated controller logic 
var Routes = require('./controllers/main.js');
var routes = new Routes(namespaces);
app.use(routes);