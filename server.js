/*
* Requirements
*/

var express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    path = require('path');

var app = express(),
    Woolyarn = require('./public/js/Woolyarn.js').Woolyarn;

var Debug = {
    log: function (msg) {
        console.log(new Date().toJSON() +": "+ msg);
    }
};

// Express configuration

app.configure(function() {
    app.use(express.logger('short'));
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.favicon());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

// app.get('/', function(req, res) {
//  res.sendfile('public/index.html');
// });

var server = http.createServer(app).listen(app.get('port'), function() {
    Debug.log("Express server listening on port "+ app.get('port') +" in "+ app.get('env') +" mode.");
});

/*
* Socket.IO
*/

var io = socketio.listen(server);

io.configure(function() {
    io.enable('browser client minification');
    io.set('log level', 1);
});

Woolyarn.server.init(io, function(client) {

    // Here you can listen for your events

    Woolyarn.server.on('customEvent', function(data) {
        Debug.log('Incoming customEvent from: '+ client.id);

        io.sockets.emit('customEvent', client.id);
    });
});