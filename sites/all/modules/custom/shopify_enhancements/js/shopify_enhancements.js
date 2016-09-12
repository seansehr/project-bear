/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements = {
    attach: function (context, settings) {
      if (context == document) {
        $('.product__images').on('click', '.js-open-modal', function (event) {
          $('#imageModal').foundation('reveal', 'open');
        });
        $('#imageModal').on('click', '.js-close-modal', function (event) {
          $('#imageModal').foundation('reveal', 'close');
        });

        $(document).on('open.fndtn.reveal', '[data-reveal]', function () {
          $('body').addClass('reveal');
        });

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
          $('body').removeClass('reveal');
        });


        $('.flexslider').on('start', function (event) {
          var $prev = $('.controls--prev', this),
              $next = $('.controls--next', this),
              slider = $(this).data('flexslider'),
              slidesCount = slider.slides.length;

          if ($prev.length || $next.length) {

            $prev.on('click', function () {
              var slide = slider.currentSlide - 1 >= 0 ? slider.currentSlide - 1 : (slider.slides.length - 1);
              slider.flexAnimate(slide);
            });

            $next.on('click', function () {
              var slide = slider.currentSlide + 1 < slider.slides.length ? slider.currentSlide + 1 : 0;
              slider.flexAnimate(slide);
            });
          }
        });


        for (var key in Drupal.settings.shopify_enhancements.instances) {
          var url = Drupal.settings.shopify_enhancements.instances[key].url,
              categories = Drupal.settings.shopify_enhancements.instances[key].categories;

          Drupal.shopify_enhancements.createFilter(url, key, categories).then(function(store) {
            Drupal.shopify_enhancements.stores.add(key, store);
          })
        }

        Drupal.shopify_enhancements.client = ShopifyBuy.buildClient({
          apiKey: '70d4172240cf29a471c73f66f30776fe',
          myShopifyDomain: Drupal.settings.shopify_enhancements.domain,
          appId: '6'
        });
      }
    }
  };

}(jQuery));
