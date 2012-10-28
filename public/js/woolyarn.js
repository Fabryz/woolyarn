/*
* Woolyarn
* A library for your realtime applications
* @author: Codello Fabrizio
*/
(function(exports) {

	var Woolyarn = {
		socket: null,
		host: window.location.origin,
		player: new Player(),
		players: [],

		init: function() {
			var debug = this.debug;

			debug.init();

			this.connect();

			this.socket.on('connect', function() {
				debug.status.html("Connected.");
				debug.log("Connected.");
			});

			this.socket.on('disconnect', function() {
				debug.status.html("Disconnected.");
				debug.log("Disconnected.");
			});

			this.socket.on('tot', function(data) {
				debug.tot.html(data.tot);
				debug.log("Current players number: "+ data.tot);
			});

			this.socket.on('join', function(data) {
				Woolyarn.player = jQuery.extend(true, {}, data.player);

				debug.playerId.html(data.player.id);

				debug.log('You have joined the server. (id: '+ data.player.id +').');
			});

			this.socket.on('quit', function(data) {
				var quitter = '';

				var length = Woolyarn.players.length;
				for(var i = 0; i < length; i++) {
					if (Woolyarn.players[i].id == data.id) {
						quitter = Woolyarn.players[i].nick;
						Woolyarn.players.splice(i, 1);
						break;
					}
				}

				debug.log('< Player quitted: '+ quitter +' (id: '+ data.id +').');
			});

			this.socket.on('newplayer', function(data) {
				var newPlayer = new Player();
				newPlayer = jQuery.extend(true, {}, data.player);
				Woolyarn.players.push(newPlayer);

				debug.log('> New player joined: '+ newPlayer.nick +' (id: '+ newPlayer.id +').');
				
				newPlayer = {};
			});

			this.socket.on('playerlist', function(data) {
				Woolyarn.players = []; //prepare for new updated list

				var length = data.list.length;
				for(var i = 0; i < length; i++) {
					var tmpPlayer = new Player();
					tmpPlayer = jQuery.extend(true, {}, data.list[i]);
					Woolyarn.players.push(tmpPlayer);

					tmpPlayer = {};
				}

				debug.log('Initial player list received: '+ length +' players.');
			});
		},
		connect: function(host) {
			this.socket = new io.connect(host || this.host);
			return this.socket;
		},
		getSocket: function() {
			return this.socket;
		},
		setSocket: function(socket) {
			this.socket = socket;
		},

		debug: {
			status: null,
			playerId: null,
			tot: null,
			online: null,
			guiHandle: null,

			init: function() {
				this.inject();
				this.status.html("Connecting...");

				var that = this;
				$(document).keyup(function(e) {
					if (e.keyCode === 220) { //backslash
						that.guiHandle.slideToggle('fast');
					}
				});
			},
			log: function (msg) {
				console.log(new Date().toJSON() +": "+ msg);
			},
			inject: function() {
				this.status = $('<div/>', { id: 'status'	});
				this.playerId = $('<div/>', { id: 'playerId' });
				this.tot = $('<span/>', { id: 'tot', text: '0' });
				this.online = $('<div/>', { id: 'online', text: ' players online.' });

				this.online.prepend(this.tot);

				this.guiHandle = $('<div/>', {
					id: 'default-debug'
				}).append( this.status )
				.append( this.playerId )
				.append( this.online );

				$('body').append( this.guiHandle );
			}
		}
	};

	exports.Woolyarn = Woolyarn;
})(typeof global === "undefined" ? window : exports);