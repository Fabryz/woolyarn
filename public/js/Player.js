(function(exports) {

	var Player = function(id, nick) {
		this.id = id || -1;
		this.nick = 'player'+ this.id || nick;
		this.createdAt = Date.now();
		this.updatedAt = Date.now();
	};

	Player.prototype.toString = function() {
		return '('+ this.id +') '+ this.nick;
	};

	exports.Player = Player;
})(typeof global === "undefined" ? window : exports);