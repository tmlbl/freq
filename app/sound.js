/**
 * Constructor for ambient sound elements
 * opts.src is the path to the audio file
 * volId is the ID to give the volume slider element
 * @param {Object} opts { src: String, id: String }
 */
function Ambience(opts) {
  this.opts = opts;
  this.wire();
  this.createGainSlider();
  this.play();
  this.listen();
}

// Creates audio element
// Connects audio element to the gain unit then to out
Ambience.prototype.wire = function() {
  this.audio = new Audio(this.opts.src);
  this.srcElement = document.context.createMediaElementSource(this.audio);
  this.vol = document.context.createGain();
  this.srcElement.connect(this.vol);
  this.vol.connect(document.context.destination);
};

// Creates the slider element to control the gain
Ambience.prototype.createGainSlider = function() {
  var src = $('#ambience-template').html();
  this.slider = Handlebars.compile(src);
  $('#sliderlist').append(this.slider(this.opts));
};

// Starts the audio loop
Ambience.prototype.play = function() {
  this.audio.loop = true;
  this.audio.play();
};

// Listen to change in slider value
Ambience.prototype.listen = function() {
  var self = this;
  var id = '#' + this.opts.id;
  $(id).change(function () {
    self.vol.gain.value = $(id).val();
  });
};
