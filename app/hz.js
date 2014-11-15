/**
 * [HzMeter description]
 * @param {[type]} opts [description]
 */
function HzMeter(opts) {
  this.LeftEar = opts.left;
  this.RightEar = opts.right;
  this.render();
}

HzMeter.prototype.render = function() {
  var src = $('#hz-template').html();
  this.ui = Handlebars.compile(src);
  $('#hz-window').append(this.ui(this.opts));
};
