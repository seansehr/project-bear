/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements_search = {
    attach: function (context, settings) {
      if (context == document) {
        var $form = $('.block-shopify-enhancements-product-search form'),
            $submit = $('#search-button', $form),
            $input = $('.form-item-term input');

        $submit.on('click', function (event) {
          if (!$form.hasClass('opened')) {
            $form.addClass('opened');
            $input.focus();
          }
          else if ($input.val().length) {
            $form.submit();
          }
        });
      }
    }
  };

}(jQuery));
