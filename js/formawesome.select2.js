(function($, Drupal){

  /**
   * Enhance select-elements with select2.
   */
  Drupal.behaviors.formawesome_select2 = {
    attach: function (context, settings) {
      $('select', context).not('.filter-list').select2({
        adaptContainerCssClass: function (c) { return null; },
        adaptDropdownCssClass: function (c) { return null; },
        minimumResultsForSearch: 8,
      });
    }
  };

}(jQuery, Drupal));
