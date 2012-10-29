/*
* Woolyarn
* A library for your realtime applications
* @author: Codello Fabrizio
*/

(function(exports) {

	var Player = function(id, nick) {
		this.id = id || 0;
		this.nick = 'player'+ this.id || nick;
		this.createdAt = Date.now();
		this.updatedAt = Date.now();
	};

	Player.prototype.toString = function() {
		return '('+ this.id +') '+ this.nick;
	};

	exports.Player = Player;
})(typeof global === "undefined" ? window : exports);

(function(exports) {

	var Woolyarn = {
		socket: null,
		player: null,
		players: [],
		totalPlayers : 0,

		Player: function(id, nick) {
			return new exports.Player(id, nick);
		},

		getSocket: function() {
			return this.socket;
		},
		setSocket: function(socket) {
			this.socket = socket;
		},

		client: {
			init: function(host) {
				var debug = this.debug;
				debug.init();

				Woolyarn.client.connect(host || window.location.origin);

				Woolyarn.player = new Player();

				Woolyarn.socket.on('connect', function() {
					debug.status.html("Connected.");
					debug.log("Connected.");
				});

				Woolyarn.socket.on('disconnect', function() {
					debug.status.html("Disconnected.");
					debug.log("Disconnected.");
				});

				Woolyarn.socket.on('tot', function(total) {
					// totalPlayers = total;
					debug.tot.html(total);
					debug.log("Current players number: "+ total);
				});

				Woolyarn.socket.on('join', function(player) {
					Woolyarn.player = jQuery.extend(true, {}, player);

					debug.playerId.html(player.id);

					debug.log('You have joined the server. (id: '+ player.id +').');
				});

				Woolyarn.socket.on('quit', function(data) {
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

				Woolyarn.socket.on('newplayer', function(player) {
					var newPlayer = new Player();
					newPlayer = jQuery.extend(true, {}, player);
					Woolyarn.players.push(newPlayer);

					debug.log('> New player joined: '+ newPlayer.nick +' (id: '+ newPlayer.id +').');
					
					newPlayer = {};
				});

				Woolyarn.socket.on('playerlist', function(data) {
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
				return Woolyarn.socket = new io.connect(host);
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
						id: 'woolyarn-debug'
					}).append( this.status )
					.append( this.playerId )
					.append( this.online );

					$('body').append( this.guiHandle );
				}
			}
		},
		server: {

			init: function(io) {

				io.sockets.on('connection', function(client) {
					Woolyarn.player = new Woolyarn.Player(client.id);

					Woolyarn.server.newPlayer(client, Woolyarn.player);
					Woolyarn.server.sendPlayerList(client);

					Woolyarn.totalPlayers++;
					Woolyarn.server.debug.log('+ '+ client.id +' connected, total players: '+ Woolyarn.totalPlayers);

					io.sockets.emit('tot', Woolyarn.totalPlayers);

					client.on('disconnect', function() {
						var quitter = '';

						var length = Woolyarn.players.length;
						for(var i = 0; i < length; i++) {
							if (Woolyarn.players[i].id == client.id) {
								quitter = Woolyarn.players[i].nick;
								Woolyarn.players.splice(i, 1);
								break;
							}
						}

						Woolyarn.totalPlayers--;
						client.broadcast.emit('quit', { id: client.id });
						io.sockets.emit('tot', Woolyarn.totalPlayers);
						Woolyarn.server.debug.log('< '+ quitter +' ('+ client.id +') disconnected, total players: '+ Woolyarn.totalPlayers);
					});
				});
			},
			getPlayerById: function(id) {
				var length = Woolyarn.players.length;
				for(var i = 0; i < length; i++) {
					if (Woolyarn.players[i].id == id) {
						return Woolyarn.players[i];
					}
				}

				return null;
			},
			sendPlayerList: function(client) {
				client.emit('playerlist', { list: Woolyarn.players });
				this.debug.log('* Sent player list to '+ client.id);
			},
			newPlayer: function(client, player) {
				Woolyarn.players.push(player);

				client.emit('join', player );
				client.broadcast.emit('newplayer', player);

				this.debug.log('> New player: '+ player.nick);
			},

			debug: {
				init: function() {

				},
				log: function(msg) {
					console.log(msg);
				}
			}

		}

	};

	exports.Woolyarn = Woolyarn;
})(typeof global === "undefined" ? window : exports);