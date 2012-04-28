$(document).ready(function() {

	/*
	* Functions
	*/

	function log(msg) {
		console.log(new Date().toJSON() +": "+ msg);
	}

	function toggleDebug(spd) {
		var speed = spd || 'fast';
	
		defaultDebug.fadeToggle(speed);
		defaultDebug.toggleClass("active");
		if (defaultDebug.hasClass("active")) {

		} else {

		}
	}

	function insertDebug() {
		status = $('<div/>', {
			id: 'status'
		});

		clientId = $('<div/>', {
			id: 'clientId'
		});

		tot = $('<span/>', {
			id: 'tot',
			text: '0'
		});

		online = $('<div/>', {
			id: 'online',
			text: ' players online.'
		});

		online.prepend(tot);

		defaultDebug = $('<div/>', {
			id: 'default-debug'
		}).append( status )
		  .append( clientId )
		  .append( online );

		$('body').append( defaultDebug );
	}

	function init() {
		insertDebug();

		status.html("Connecting...");

		$(document).keyup(function(e) {
			if (e.keyCode === 220) { //backslash
				toggleDebug();
			}
		});
	}

	/*
	* Main
	*/

	var socket = new io.connect(window.location.href);
	
	var status,
		clientId,
		online,
		tot,
		defaultDebug;

	var player = new Player(),
		players = [];
		
	init();

	/* 
	* Socket.IO
	*/

	socket.on('connect', function() {
		status.html("Connected.");
		log("Connected.");
	});

	socket.on('disconnect', function() {
		status.html("Disconnected.");
		log("Disconnected.");
	});

	socket.on('tot', function(data) {	
		tot.html(data.tot);
		log("Current players number: "+ data.tot);
	});

	socket.on('join', function(data) {
		player = jQuery.extend(true, {}, data.player);

		clientId.html(data.player.id);

		log('You have joined the server. (id: '+ data.player.id +').');
	});

	socket.on('quit', function(data) {
		var quitter = '';

		var length = players.length;
		for(var i = 0; i < length; i++) {
			if (players[i].id == data.id) {
				quitter = players[i].nick;
				players.splice(i, 1);
				break;
			}
		}

		log('< Player quitted: '+ quitter +' (id: '+ data.id +').');
	});

	socket.on('newplayer', function(data) {
		var newPlayer = new Player();
		newPlayer = jQuery.extend(true, {}, data.player);
		players.push(newPlayer);

		log('> New player joined: '+ newPlayer.nick +' (id: '+ newPlayer.id +').');
		
		newPlayer = {};
	});

	socket.on('playerlist', function(data) {
		players = []; //prepare for new updated list

		var length = data.list.length;
		for(var i = 0; i < length; i++) {
			var tmpPlayer = new Player();
			tmpPlayer = jQuery.extend(true, {}, data.list[i]);
			players.push(tmpPlayer);

			tmpPlayer = {};
		}

		log('Initial player list received: '+ length +' players.');
	});

});