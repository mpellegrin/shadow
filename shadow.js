var app = {};

app.tagString = function(a, b) {
  // Naive function without backtracking that
  // identify the differences between the strings
  // and return the b string tagged with fade span
  // on the differences
  var a_i = 0;
  var b_i = 0;
  var newString = '';
  while (a_i < a.length && b_i < b.length) {
    while (a_i < a.length && b_i < b.length && a[a_i] == b[b_i]) { newString += b[b_i]; a_i++; b_i++; }
    if (b_i < b.length) {
      newString += '<span class="show">';
      while (b_i < b.length && a[a_i] != b[b_i]) { newString += b[b_i]; b_i++; }
      newString += '</span>';
    }
  }
  return newString;
}

app.resetBuffer = function() {
    console.log('reset timeout');
    app.bufferedOldText = '';
    app.resetBufferTimeout = false;
};

jQuery(document).ready(function() {
  jQuery('#editable').height(jQuery(document).height());
  jQuery('#editable').width(jQuery(document).width());
  jQuery('#hover').height(jQuery(document).height());
  jQuery('#hover').width(jQuery(document).width());

  app.lock = false;
  app.resetBufferTimeout = false;
  setInterval(function() {
    if (!app.lock) {
      console.log('fade');
      jQuery('.show').removeClass('show');
      if (app.resetBufferTimeout === false) {
          app.resetBufferTimeout = setTimeout(app.resetBuffer, 1000);
      }
    }
  }, 300);

  app.bufferedOldText = '';

  jQuery('#hover').click(function(e) {
    e.preventDefault();
    jQuery('#editable').focus();
    console.log('focus');

    var newContent = '';
    var newText = jQuery('#editable').val();

    newContent = '<span class="show">' + newText + '</span>'
    jQuery('#hover').html(newContent);

  });

  jQuery('#editable').keyup(function (e) {
    console.log('keyup');

    var newContent = '';
    if (app.bufferedOldText != '') {
        var oldText = app.bufferedOldText;
    } else {
        var oldText = jQuery('#hover').text();
	app.bufferedOldText = oldText;
    }
    var newText = jQuery('#editable').val();

    if (false && e.keyCode == 17) { // CTRL
      console.log('CTRL');
      newContent = '<span class="show">' + newText + '</span>';
    } else {
      newContent = app.tagString(oldText, newText);
    }
    jQuery('#hover').html(newContent);

    app.lock = true;
    if (app.resetBufferTimeout) {
      clearTimeout(app.resetBufferTimeout);
      app.resetBufferTimeout = false;
    }
    if (app.fadeTimeout) {
      clearTimeout(app.fadeTimeout);
    }
    app.fadeTimeout = setTimeout(function() { app.lock = false; }, 1000);
  });
});

jQuery(document).resize(function () {
  jQuery('#editable').height(jQuery(document).height());
  jQuery('#editable').width(jQuery(document).width());
  jQuery('#hover').height(jQuery(document).height());
  jQuery('#hover').width(jQuery(document).width());
});
