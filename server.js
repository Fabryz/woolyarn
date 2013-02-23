/*
* Express
*/

var express = require('express'),
	socketio = require('socket.io'),
	http = require('http'),
    path = require('path');

var app = express(),
	Woolyarn = require('./public/js/woolyarn.js').Woolyarn;

// Configuration

app.configure(function(){
	app.set('port', process.env.PORT || 8080);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('short'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

// app.get('/', function(req, res) {
// 	res.sendfile('index.html');
// });

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port "+ app.get('port') +" in "+ app.get('env') +" mode.");
});

/*
* Socket.IO
*/

var	io = socketio.listen(server);	
	
io.configure(function() {
	io.enable('browser client minification');
	io.set('log level', 1);
});

Woolyarn.server.init(io);

var client = Woolyarn.server.getClient();

// console.log(client);

// client.on('customEvent', function(data) {
// 	io.sockets.emit('customEvent');
// });