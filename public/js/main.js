$(document).ready(function() {

	Woolyarn.client.init();

	var socket = Woolyarn.getSocket();

	$('button').on('click', function() {
		socket.emit('customEvent');
	});

	socket.on('customEvent', function() {
		alert('Clicked button, do something!');
	});
});