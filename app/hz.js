/**
 * [HzMeter description]
 * @param {[type]} opts [description]
 */
function HzMeter(opts) {
  this.LeftEar = opts.left;
  this.RightEar = opts.right;
  this.render();
  this.listen();
}

HzMeter.prototype.render = function() {
  var src = $('#hz-template').html();
  this.ui = Handlebars.compile(src);
  $('#hz-window').append(this.ui(this.opts));
  this.leftEarHz = $('#leftearhz');
  this.rightEarHz = $('#rightearhz');
  this.binauralHz = $('#bahz');
  this.update();
};

HzMeter.prototype.update = function(first_argument) {
  var rightVal = this.RightEar.osc.frequency.value,
      leftVal = this.LeftEar.osc.frequency.value,
      binaural = Math.abs(rightVal - leftVal);

  this.leftEarHz.val(leftVal);
  this.rightEarHz.val(rightVal);
  this.binauralHz.val(binaural);
};

HzMeter.prototype.listen = function() {
  var self = this;
  this.LeftEar.onFreqChange(function () {
    self.update();
  });
  this.RightEar.onFreqChange(function () {
    self.update();
  });
};
