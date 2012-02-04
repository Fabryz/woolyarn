$(document).ready(function() {
	var socket = new io.connect(window.location.href);
	
	var status = $("#status"),
		clientId = $("#clientId"),
		online = $("#online"),
		tot = $("#tot"),
		debug = $("#debug");
		
	status.html("Connecting...");

	function toggleDebug(spd) {
		var speed = spd || 'fast';
	
		debug.fadeToggle(speed);
		debug.toggleClass("active");
		if (debug.hasClass("active")) {

		} else {

		}
	}

	$(document).keyup(function(e) {
		if (e.keyCode === 220) { //backslash
			toggleDebug();
		}
	});
	
	/* 
	* Socket.io
	*/
	    
    socket.on('connect', function() {
    	status.html("Connected.");
	});
			
	socket.on('disconnect', function() {
		status.html("Disconnected.");
	});
	
	socket.on('clientId', function(data) {
    	clientId.html(data.id);
	});
	
	socket.on('tot', function(data) {	
		tot.html(data.tot);
	});

	socket.on('default', function(data) {	
		//console.log(data);

	});
});