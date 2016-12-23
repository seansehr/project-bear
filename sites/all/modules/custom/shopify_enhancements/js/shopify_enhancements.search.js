/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements_search = {
    attach: function (context, settings) {
      if (context == document) {
        var $block = $('.block-shopify-enhancements-product-search'),
            $form = $('form', $block),
            $submit = $('#search-button', $form),
            $input = $('.form-item-term input');

        $(document).on('click', function(event) {
          if(!$(event.target).closest($block).length) {
            if($block.hasClass('opened')) {
              $block.removeClass('opened');
            }
          }
        });

        $submit.on('click', function (event) {
          if (!$block.hasClass('opened')) {
            $block.addClass('opened');
            $input.focus();
          }
          else if ($input.val().length) {
            $form.submit();
          }
          else {
            $block.removeClass('opened');
          }
        });
      }
    }
  };

}(jQuery));
