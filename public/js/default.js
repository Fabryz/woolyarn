$(document).ready(function() {

	var Debug = {

		log: function (msg) {
			console.log(new Date().toJSON() +": "+ msg);
		},

		toggle: function(speed) {
			speed = speed || 'fast';
		
			defaultDebug.slideToggle(speed);
		},

		inject: function() {
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
	};

	function init() {
		Debug.inject();

		status.html("Connecting...");

		$(document).keyup(function(e) {
			if (e.keyCode === 220) { //backslash
				Debug.toggle();
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
		Debug.log("Connected.");
	});

	socket.on('disconnect', function() {
		status.html("Disconnected.");
		Debug.log("Disconnected.");
	});

	socket.on('tot', function(data) {	
		tot.html(data.tot);
		Debug.log("Current players number: "+ data.tot);
	});

	socket.on('join', function(data) {
		player = jQuery.extend(true, {}, data.player);

		clientId.html(data.player.id);

		Debug.log('You have joined the server. (id: '+ data.player.id +').');
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

		Debug.log('< Player quitted: '+ quitter +' (id: '+ data.id +').');
	});

	socket.on('newplayer', function(data) {
		var newPlayer = new Player();
		newPlayer = jQuery.extend(true, {}, data.player);
		players.push(newPlayer);

		Debug.log('> New player joined: '+ newPlayer.nick +' (id: '+ newPlayer.id +').');
		
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

		Debug.log('Initial player list received: '+ length +' players.');
	});

});