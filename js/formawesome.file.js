(function($, Drupal){
  /**
   * Behavior for styleable file upload fields.
   * @type {{}}
   */
  Drupal.behaviors.formawesomeFile = {
    attach: function($context, settings) {
      $('input[type="file"].formawesome-enhanced', $context).once(function(){
        var $wrapper = $('<div class="image-preview formawesome-upload"></div>');
        var $status = $('<span class="formawesome-upload-status"></span>');
        var $button = $('<span class="formawesome-upload-choose">' + Drupal.t('Choose file') + '</span>');
        var $upload = $(this).closest('.form-managed-file').find('input[type="submit"]');
        $upload.attr('disabled', 'disabled');
        $(this).wrap($wrapper);
        $status.insertBefore(this);
        $button.insertBefore(this);
        $(this).change(function() {
          var val = $(this).val();
          if (val.length > 0) {
            $upload.removeAttr('disabled');
            $status.text(val.replace(/^.*[\\\/]/, ''));
          }
          else {
            $upload.attr('disabled', 'disabled');
            $status.text('');
          }
        });
      });
    }
  };
}(jQuery, Drupal));