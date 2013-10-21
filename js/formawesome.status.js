/**
 * @file
 * Drupal behavior to pass form elements status changes to the form wrapper
 * for styling purposes.
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
      $('input, textarea, select', context).once(function() {
        var $input = $(this);
        var type = $input.attr('type');
        var hovered = false;
        var focused = false;

        // Early abort if element is without status.
        if ($.inArray(type, ['submit', 'reset', 'button', 'image', 'hidden']) > -1) {
          return;
        }

        // Search the according wrapper element.
        var $wrapper = $input.parents('.form-item').first();
        if ($wrapper.length === 0) {
          return;
        }

        /**
         * Get change events and set filled-status on $wrapper.
         */
        var change = function() {
          if (type === 'radio' || type == 'checkbox') {
            if ($input.is(':checked')) {
              if (type === 'radio') {
                $input.parents('form').find('input[name="' + $input.attr('name') + '"]').parents('.form-item').removeClass('form-filled');
              }
              $wrapper.addClass('form-filled');
            }
            else {
              $wrapper.removeClass('form-filled');
            }
          }
          else {
            if ($input.val() !== '') {
              $wrapper.addClass('form-filled');
            }
            else {
              $wrapper.removeClass('form-filled');
            }
          }
        };

        // Attach change event handler.
        $input.change(change);
        $input.keyup(change);

        // Trigger an initial change for prefilled elements.
        change();

        /**
         * Simple callback to refresh current focused state.
         */
        var refreshFocus = function () {
          if (focused || hovered) {
            $wrapper.addClass('form-focused');
          }
          else {
            $wrapper.removeClass('form-focused');
          }
        };

        // Act appropriatly on focus, hover and blur events.
        $input.focusin(function() {
          focused = true;
          refreshFocus();
        });
        $input.focusout(function() {
          focused = false;
          refreshFocus();
        });

        $wrapper.hover(function() {
          hovered = true;
          refreshFocus();
        }, function() {
          hovered = false;
          refreshFocus();
        });

        var checkEnabled = function () {
          // sync enabled state
          var disabled = $input.attr("disabled");
          if (disabled === undefined) disabled = false;
          if (disabled) {
            $wrapper.addClass('form-disabled');
          }
          else {
            $wrapper.removeClass('form-disabled');
          }

          var readonly = $input.attr("readonly");
          if (readonly === undefined) readonly = false;
          if (readonly) {
            $wrapper.addClass('form-readonly');
          }
          else {
            $wrapper.removeClass('form-readonly');
          }
        };

        // mozilla and IE
        $(this).bind("propertychange DOMAttrModified", checkEnabled);

        // hold onto a reference of the callback to work around a chromium bug
        if (this.mutationCallback === undefined) {
          this.mutationCallback = function (mutations) {
            mutations.forEach(checkEnabled);
          }
        }

        // safari and chrome
        if (typeof WebKitMutationObserver !== "undefined") {
          if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }
          this.propertyObserver = new WebKitMutationObserver(this.mutationCallback);
          this.propertyObserver.observe(this, { attributes:true, subtree:false });
        }
      });
    }
  };
}(jQuery, Drupal));