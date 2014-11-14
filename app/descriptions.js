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
