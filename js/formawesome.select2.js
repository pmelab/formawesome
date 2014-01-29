/**
 * @file
 * Formawesome Select2 behavior for select and multiselect elements.
 */
(function($, Drupal){
  /**
   * Initialize empty theme function registry.
   */
  Drupal.formawesome = {
    theme: {}
  };
  /**
   * Enhance select-elements with select2.
   */
  Drupal.behaviors.formawesome_select2 = {
    attach: function (context, settings) {
      $('select.enhanced', context).once(function() {
        var $label = $(this).parent().find('label');
        $label.css('display', 'none');
        var options = {
          placeholder: $label.text(),
          adaptContainerCssClass: function (c) { return null; },
          adaptDropdownCssClass: function (c) { return null; },
          minimumResultsForSearch: -1,
          selectOnBlur: true
        };
        if ($(this).data('theme') && Drupal.formawesome.theme[$(this).data('theme')]) {
          var theme = Drupal.formawesome.theme[$(this).data('theme')];
          options.formatResult = theme;
          options.formatSelection = theme;
        }
        $(this).select2(options);
      });
    }
  };
}(jQuery, Drupal));
