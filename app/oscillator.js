/**
 * Constructor for the tone oscillators
 */
function Oscillator(opts) {
  this.opts = opts;
  this.wire();
  this.render();
  this.play();
  this.listen();
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
  this.component = Handlebars.compile(src);
  $('#sliderlist').append(this.component(this.opts));
};

// Listen to the slider change events
Oscillator.prototype.listen = function() {
  var self = this;
  // Listen to the volume slider
  this.volSlider = $('#' + this.opts.id + 'vol');
  this.volSlider.change(function () {
    self.setVolume(self.volSlider.val());
  });
  // Listen to the frequency slider
  this.freqSlider = $('#' + this.opts.id + 'freq');
  this.freqSlider.change(function () {
    self.setFrequency(self.freqSlider.val());
  });
};

Oscillator.prototype.setFrequency = function(val) {
  this.osc.frequency.value = val;
  this.freqSlider.val(val);
  if (this.freqChangeCallback) this.freqChangeCallback();
};

Oscillator.prototype.onFreqChange = function(func) {
  this.freqChangeCallback = func;
};

Oscillator.prototype.setVolume = function(val) {
  this.vol.gain.value = val;
  this.volSlider.val(val);
};
