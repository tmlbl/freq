/**
 * Constructor for the tone oscillators
 */
function Oscillator(opts) {
  this.opts = opts;
  this.wire();
  this.render();
  //this.play();
}

// Create and connect audio components
Oscillator.prototype.wire = function() {
  this.osc = document.context.createOscillator();
  this.osc.type = 'sine';
  this.panner = document.context.createPanner();
  this.panner.setPosition(this.opts.position, 0, 0);
  this.vol = document.context.createGain();
  this.osc.connect(this.panner);
  this.panner.connect(this.vol);
  this.vol.connect(document.context.destination);
};

// Turn on the oscillator
Oscillator.prototype.play = function() {
  this.osc.frequency.value = 200;
  this.osc.noteOn(0);
};

// Create HTML elements
Oscillator.prototype.render = function() {
  var src = $('#osc-template').html();
  this.slider = Handlebars.compile(src);
  $('#sliderlist').append(this.slider(this.opts));
};
