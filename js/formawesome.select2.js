/**
 * @file
 * Formawesome Select2 behavior for select and multiselect elements.
 */
(function($, Drupal){
  /**
   * Enhance select-elements with select2.
   */
  Drupal.behaviors.formawesome_select2 = {
    attach: function (context, settings) {
      $('select', context).once(function() {
        var $label = $(this).parent().find('label');
        $label.css('display', 'none');
        $(this).select2({
          placeholder: $label.text(),
          adaptContainerCssClass: function (c) { return null; },
          adaptDropdownCssClass: function (c) { return null; },
          minimumResultsForSearch: 8
        });
      });
    }
  };
}(jQuery, Drupal));
