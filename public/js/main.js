$(document).ready(function() {

	required_files = [
		'/socket.io/socket.io.js',
		'/js/woolyarn.js'
	];

	require(required_files, function() {

		Woolyarn.client.init('http://localhost:8080');

		// Send a customEvent event when the button is pressed
		$('button').on('click', function() {
			Woolyarn.socket.emit('customEvent');

			console.log('customEvent event fired');
		});

		// A customEvent event has arrived, who pressed it?
		Woolyarn.socket.on('customEvent', function(clientId) {
			console.log('customEvent event arrived from '+ clientId);

			alert(clientId +' has clicked the button!');
		});

	});
});