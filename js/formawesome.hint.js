/**
 * @file
 * jQuery plugin for attachable drupal form hints.
 */
(function($){
  $.fn.attachHint = function(callback) {
    $(this).each(function(){
      var $hint = $('<div class="form-hint"></div>');
      var added_classes = [];
      var $wrapper = $(this).parents('.form-item').first();
      $wrapper.append($hint);
      $(this).bind('keyup focus blur', function(){
        var value = $(this).val();
        var result = callback(value);

        if (typeof result === 'string') {
          result = { text: result, class: false };
        }
        else if (typeof result !== 'object') {
          result =  { text: false, class: false };
        }

        if (result.text === value) {
          result.text = false;
        }

        var c = false;
        while (c = added_classes.pop()) {
          $wrapper.removeClass(c);
        }

        if (result.text) {
          $hint.text(result.text);
          $wrapper.removeClass('hint-hidden');
        }
        else {
          $hint.text('');
          $wrapper.addClass('hint-hidden');
        }

        if (result.class) {
          if (typeof result.class !== 'array') {
            result.class = [result.class];
          }
          $.each(result.class, function (i, c) {
            added_classes.push(c);
            $wrapper.addClass(c);
          });
        }
      });
    });
  };
}(jQuery));