$(document).ready(function () {

	// Set up audio context
	var context1 = document.context;

	// Set up oscillators
	var osc1 = new Oscillator({
		position: -3,
		id: 'leftear',
		title: 'Left Ear'
	});

	var osc2 = new Oscillator({
		position: 3,
		id: 'rightear',
		title: 'Right Ear'
	});

	// Set up ambient sounds
	var water = new Ambience({
		src: 'sounds/water.wav',
		id: 'water',
		title: 'Water'
	});

	var rain = new Ambience({
		src: 'sounds/rainbirds.wav',
		id: 'rain',
		title: 'Rain'
	});

	var crickets = new Ambience({
		src: 'sounds/crickets.wav',
		id: 'crickets',
		title: 'Crickets'
	});

	var fire = new Ambience({
		src: 'sounds/fire.wav',
		id: 'fire',
		title: 'Fire'
	});

});
