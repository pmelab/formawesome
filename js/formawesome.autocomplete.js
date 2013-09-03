/**
 * @file
 * Replace drupal autocomplete behavior with jQuery select2.
 */

(function(Drupal, $){
  /**
   * Attaches the autocomplete behavior to all required fields.
   */
  Drupal.behaviors.formawesome_autocomplete = {
    attach: function(context, settings) {
      $('input.autocomplete', context).once('autocomplete', function(){
        // Read options from elements.
        var url = $(this).val();
        var $input = $(this).parent().find('.form-autocomplete');
        var max_values = parseInt($input.attr('data-max-values')) || 1;
        var allow_unknown = $input.attr('data-allow-unknown') === 'true';
        var $label = $(this).parent().find('label');
        $label.css('display', 'none');

        var options = {};
        // TODO: Fix with base stylesheet for seven.
        options.width = '100%';
        options.placeholder = $label.text();

        // Set the max value and multiple values accordingly.
        if (max_values !== 1) {
          if (max_values > -1) {
            options.maximumSelectionSize = max_values;
          }
          options.multiple = true;
        }

        // Attach a "createSearchChoice" function to allow options from outside
        // the autocomplete callback. Used for "tagging" behavior.
        if (allow_unknown) {
          options.createSearchChoice = function (term) {
            return {id: term, text: term};
          };
        }

        // Prefill multi value fields with existing data.
        options.initSelection = function ($element, callback) {
          var data = null;
          if (options.multiple) {
            data = [];
            $($element.val().split(",")).each(function () {
              data.push({id: this, text: this});
            });
          }
          else {
            data = { id: $input.val(), text: $input.val() };
          }
          callback(data);
        };

        var timeout = false;
        options.query = function(query) {
          if (timeout) { window.clearTimeout(timeout); }
          timeout = window.setTimeout(function(){
            $.ajax({
              type: 'GET',
              url: url + '/' + Drupal.encodePath(query.term),
              dataType: 'json',
              success: function (matches) {
                if (typeof matches.status == 'undefined' || matches.status != 0) {
                  var data = {results: []};
                  $.each(matches, function(text){
                    data.results.push({id: text, text: text});
                  });
                  query.callback(data);
                }
              },
              error: function (xmlhttp) {
                alert(Drupal.ajaxError(xmlhttp, uri));
              }
            });
          }, 500);
        };
        $input.select2(options);
      });
    }
  };
}(Drupal, jQuery));