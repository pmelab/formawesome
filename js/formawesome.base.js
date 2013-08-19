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
        if ($wrapper.length === 0) {
          return;
        }

        /**
         * Set focused status on $wrapper.
         */
        function focus() {
          $wrapper.addClass('formawesome-focused');
        }

        /**
         * Remove focused status from $wrapper.
         */
        function blur() {
          $wrapper.removeClass('formawesome-focused');
        }

        /**
         * Get change events and set filled-status on $wrapper.
         */
        function change() {
          if (type === 'radio' || type == 'checkbox') {
            if ($input.is(':checked')) {
              if (type === 'radio') {
                $input.parents('.form-type-radios').find('.form-type-radio').removeClass('formawesome-filled');
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

        // Bind focus, blur and change functions to appropriate events on
        // the input element.
        $input.focusin(focus);
        $input.focusout(blur);
        $wrapper.hover(focus, blur);
        $input.change(change);
        $input.keyup(change);
        change();
      });
    }
  };
}(jQuery, Drupal));