
/* TODO:
	- Check for Chrome and redirect
	- Save user presets in local storage
	- Get UI to work for diff size screens
	- Test in Windows
	- Make some more slammin presets
	- Make Get URL window pretty
	- AWS or similar for delivering sound files
*/

$(document).ready(function () {

	// Set up audio context
	var context1 = document.context;

	// Set up osc1
	var osc1 = context1.createOscillator();
	var panner1 = context1.createPanner();
	var osc1vol = context1.createGain();
	panner1.connect(osc1vol);
	osc1vol.connect(context1.destination);
	panner1.setPosition(3, 0, 0);
	osc1.disconnect();
	osc1.noteOn(0);

	// Set up osc 2
	var osc2 = context1.createOscillator();
	var panner2 = context1.createPanner();
	var osc2vol = context1.createGain();
	panner2.connect(osc2vol);
	osc2vol.connect(context1.destination);
	panner2.setPosition(-3, 0, 0);
	osc2.disconnect();
	osc2.noteOn(0);

	// Load the ambience
	var rb = new Audio();
	rb.src = 'sounds/rainbirds.wav';
	var rbsrc = context1.createMediaElementSource(rb);
	var rbvol = context1.createGain();
	rbvol.gain.value = $('#rbvol').val();
	rbsrc.connect(rbvol);
	rbvol.connect(context1.destination);
	rb.loop = true;
	rb.play();

	var crik = new Audio();
	crik.src = 'sounds/crickets.wav';
	var criksrc = context1.createMediaElementSource(crik);
	var crikvol = context1.createGain();
	crikvol.gain.value = $('#crikvol').val();
	criksrc.connect(crikvol);
	crikvol.connect(context1.destination);
	crik.loop = true;
	crik.play();

	var fire = new Audio();
	fire.src = 'sounds/fire.wav';
	var firesrc = context1.createMediaElementSource(fire);
	var firevol = context1.createGain();
	firevol.gain.value = $('#firevol').val();
	firesrc.connect(firevol);
	firevol.connect(context1.destination);
	fire.loop = true;
	fire.play();

	var water = new Ambience({
		src: 'sounds/water.wav',
		id: 'water'
	});
	// water.src = 'sounds/water.wav';
	// var watersrc = context1.createMediaElementSource(water);
	// var watervol = context1.createGain();
	// watervol.gain.value = $('#watervol').val();
	// watersrc.connect(watervol);
	// watervol.connect(context1.destination);
	// water.loop = true;
	// water.play();

	// Functions to update the oscillators
	var play1 = function (freq) {
		osc1.type = 'sine';
		osc1.frequency.value = freq;
		osc1.connect(panner1);
		osc1.noteOn(0);
	}

	function mod1 (freq) {
		osc1.type = 'sine';
		osc1.frequency.value = freq;
		osc1.connect(panner1);
	}

	var play2 = function (freq) {
		osc2.type = 'sine';
		osc2.frequency.value = freq;
		osc2.connect(panner2);
		//osc2.noteOn(0);
	}

	// If this is a preset, load the preset
	var preset = {};
	var qString = window.location.search.substring(1);
	if (qString) {
		loadPreset(qString);
	}

	// For all loading of presets
	function loadPreset (q) {
		var p1 = parseFloat(q.substring(0, 3) + '.' +
			q.substring(3, 5));
		play1(p1);
		$('#leftfreq').val(p1);
		$('#leftearhz').val(p1);
		var p2 = parseFloat('0.' + q.substring(5, 7));
		osc1vol.gain.value = p2;
		$('#leftvol').val(p2);
		var p3 = parseFloat(q.substring(7, 10) + '.' +
			q.substring(10, 12));
		play2(p3);
		$('#rightfreq').val(p3);
		$('#rightearhz').val(p3);
		var p4 = parseFloat('0.' + q.substring(12, 14));
		osc2vol.gain.value = p4;
		$('#rightvol').val(p4);
		var p5 = parseFloat('0.' + q.substring(14, 16));
		rbvol.gain.value = p5;
		$('#rbvol').val(p5);
		var p6 = parseFloat('0.' + q.substring(16, 18));
		crikvol.gain.value = p6;
		$('#crikvol').val(p6);
		var p7 = parseFloat('0.' + q.substring(18, 20));
		firevol.gain.value = p7;
		$('#firevol').val(p7);
		var p8 = parseFloat('0.' + q.substring(20, 22));
		watervol.gain.value = p8;
		$('#watervol').val(p8);
	}

	// On page load, update Hz meters
	$('#leftearhz').val($('#leftfreq').val());
	$('#rightearhz').val($('#rightfreq').val());
	$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));

	// When the sliders change, update the oscillators and the Hz meters
	$('#leftfreq').change(function () {
		var freq = parseFloat($('#leftfreq').val());
		$('#leftearhz').val(freq.toFixed(2));
		mod1($('#leftfreq').val());
		$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));
	});
	$('#rightfreq').change(function () {
		var freq = parseFloat($('#rightfreq').val());
		$('#rightearhz').val(freq.toFixed(2));
		play2($('#rightfreq').val());
		$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));
	});

	// When a Hz meter is changed, update the oscillators, sliders and other Hz meters
	/* CLEAN THIS UP - do not want values changing when implemented. at least not visibly... */
	// Try parseDouble or try not parsing..
	$('#leftearhz').change(function () {
		if (!$.isNumeric($('#leftearhz').val())) {
			$('#leftearhz').val((parseFloat($('#leftfreq').val())).toFixed(2));
			return false;
		};
		var freq = parseFloat($('#leftearhz').val());
		$('#leftfreq').simpleSlider("setValue", (freq.toFixed(2)));
		play1($('#leftfreq').val());
		$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));
		$('#leftearhz').val(freq);
	});
	$('#rightearhz').change(function () {
		if (!$.isNumeric($('#rightearhz').val())) {
			$('#rightearhz').val((parseFloat($('#rightfreq').val())).toFixed(2));
			return false;
		};
		$('#rightfreq').simpleSlider("setValue", $('#rightearhz').val());
		play2($('#rightfreq').val());
		$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));
	});
	$('#bahz').change(function () {
		if (!$.isNumeric($('#bahz').val())) {
			$('#bahz').val(parseFloat(Math.abs($('#leftfreq').val() - $('#rightfreq').val())).toFixed(2));
		};
		var newR = (parseFloat($('#leftearhz').val()) + parseFloat($('#bahz').val()));
		$('#rightfreq').simpleSlider("setValue", (newR));
		play2(newR);
		$('#rightearhz').val(newR);
	});

	// Hook up the volume sliders to the sounds
	$('#leftvol').change(function () {
		osc1vol.gain.value = $('#leftvol').val();
	});
	$('#rightvol').change(function () {
		osc2vol.gain.value = $('#rightvol').val();
	});
	$('#rbvol').change(function () {
		rbvol.gain.value = $('#rbvol').val();
	});
	$('#crikvol').change(function () {
		crikvol.gain.value = $('#crikvol').val();
	});
	$('#firevol').change(function () {
		firevol.gain.value = $('#firevol').val();
	});
	$('#watervol').change(function () {
		watervol.gain.value = $('#watervol').val();
	});

	// When getURL is pressed, create a preset
	$('#getURL').click(function() {
		var presetURL = parseFreq($('#leftfreq').val()) + parseVol($('#leftvol').val()) + parseFreq($('#rightfreq').val()) + parseVol($('#rightvol').val()) + parseVol($('#rbvol').val()) + parseVol($('#crikvol').val()) + parseVol($('#firevol').val()) + parseVol($('#watervol').val());
		$('#url').val('http://corporationenterprises.com/freq?' + presetURL);
		$('#getUrl').fadeIn(1000);
		$('#overlay').fadeIn(700);
		$("#url").focus(function(){
		    this.select();
		});
	});

	// Close the getURL window when button is pressed
	$('#closeUrl').click(function() {
		$('#getUrl').fadeOut(1000);
		$('#overlay').fadeOut(700);
	});

	function parseFreq (f) {
		if (f == 0) {
			return '00000';
		} else if (parseFloat(f) < 100) {
			return '0' + (((parseFloat(f)).toString().replace('.','')).substring(0, 4));
		} else if (f.length < 6) {
			return f.replace('.','') + '0';
		} else {
			return (f.replace('.','')).substring(0, 5);
		}
	}

	function parseVol (v) {
		if (v == 0) {
			return '00';
		} else if (v.length < 4) {
			return (v.replace('.','')).substring(1) + '0';
		} else {
			return (v.replace('.','')).substring(1);
		}
	}

	// Descriptions of frequency ranges
	var appStart = true;
	setTimeout(function () { appStart = false; }, 20000);

	function freqRange(f) {
		if (f == 0 && appStart) {
			return 'Welcome to Freq. Move the sliders, enter values in the Hz meters,' +
				' or select a preset to get started.';
		} else if (f >= 0 && f <= 4) {
			return 'Delta Range: Deep, dreamless sleep, trance, suspended animation.';
		} else if (f > 4 && f <= 8) {
			return 'Theta Range: Creativity, intuition, imagery, oneness, knowing. ' +
				'Relates to subconscious.';
		} else if (f > 8 && f <= 13) {
			return 'Alpha Range: Light relaxation, accelerated learning, positive thinking.' +
				' Conducive to creative problem solving.';
		} else if (f > 13 && f <= 38) {
			return 'Beta Range: Normal wakefulness, the taking in of stimuli received ' +
				'through the senses.';
		} else if (f > 38 && f <= 60) {
			return 'Gamma Range: Associated with information-rich task processing & ' +
				'high-level information processing';
		} else if(f > 60) {
			return 'Try a preset for an example of a binaural beat.';
		}
	}

	// Listen for changes in BA freq and adjust description text
	setInterval(function () {
		var bahz = parseFloat($('#bahz').val());
		var desc = freqRange(bahz);
		if (desc != $('#freqDesc').text()) {
			$('#freqDesc').fadeOut(1400, function() { $('#freqDesc').html(desc) });
			$('#freqDesc').fadeIn(1400);
		}
	}, 3000);
});

