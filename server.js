/*
* Express
*/

var express = require('express'),
	app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
	app.use(express.favicon());
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/',  function(req, res) {
	res.sendfile('index.html');
});

app.listen(8080);
console.log('* Express server listening in %s mode', app.settings.env);

/*
* Socket.IO
*/

var	io = require('socket.io').listen(app),
	Woolyarn = require('./public/js/woolyarn.js').Woolyarn;
	
io.configure(function() {
	io.enable('browser client minification');
	io.set('log level', 1);
});

Woolyarn.server.init(io);