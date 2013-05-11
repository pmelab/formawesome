/**
 * @file
 *
 * Form enhancements.
 */
(function($, Drupal) {
  /**
   * Add classes for form element status to its wrapper div for styling
   * purposes.
   *
   * - formawesome-focused
   * - formawesome-filled
   */
  Drupal.behaviors.formawesome_status = {
    attach: function(context, settings) {
      $('input, textarea', context).each(function() {
        var $input = $(this);
        var type = $input.attr('type');

        // Early abort if element is without status.
        if ($.inArray(type, ['submit', 'reset', 'button', 'image', 'hidden']) > -1) {
          return;
        }

        // Search the according wrapper element.
        var $wrapper = $input.parents('.formawesome-wrapper').first();

        /**
         * Set focused status on $wrapper.
         */
        function focus() {
          $wrapper.addClass('formawesome-focused');
        }

        /**
         * Remove focused status on $wrapper.
         */
        function blur() {
          $wrapper.removeClass('formawesome-focused');
        }

        function change() {
          if (type === 'radio' || type == 'checkbox') {
            if ($input.is(':checked')) {
              if (type === 'radio') {
                $input.parents('.formawesome-radios').find('.formawesome-radio').removeClass('formawesome-filled');
              }
              $wrapper.addClass('formawesome-filled');
            }
            else {
              $wrapper.removeClass('formawesome-filled');
            }
          }
          else {
            if ($input.val() !== '') {
              $wrapper.addClass('formawesome-filled');
            }
            else {
              $wrapper.removeClass('formawesome-filled');
            }
          }
        }

        $input.focusin(focus);
        $input.focusout(blur);
        $input.change(change);
        $input.keyup(change);
        change();
      });
    }
  };

  /**
   * Enhance select-elements with select2.
   */
  Drupal.behaviors.formawesome_select2 = {
    attach: function (context, settings) {
      $('select', context).select2();
    }
  };
}(jQuery, Drupal));