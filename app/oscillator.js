/**
 * Constructor for the tone oscillators
 */
function Oscillator(opts) {
  this.opts = opts;
  this.wire();
  //this.play();
}

Oscillator.prototype.wire = function() {
  this.osc = document.context.createOscillator();
  this.osc.type = 'sine';
  this.panner = document.context.createPanner();
  this.vol = document.context.createGain();
  this.osc.connect(this.panner);
  this.panner.connect(this.vol);
  this.vol.connect(document.context.destination);
};

Oscillator.prototype.play = function() {
  this.osc.frequency.value = 200;
  this.osc.noteOn(0);
};
