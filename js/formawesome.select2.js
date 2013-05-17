(function($, Drupal){

  /**
   * Enhance select-elements with select2.
   */
  Drupal.behaviors.formawesome_select2 = {
    attach: function (context, settings) {
      $('select', context).not('.filter-list').select2({
        width: '100%',
        minimumResultsForSearch: 8
      });
    }
  };
}(jQuery, Drupal));
