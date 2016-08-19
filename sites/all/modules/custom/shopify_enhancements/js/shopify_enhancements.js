/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements = {
    attach: function (context, settings) {
      if (context == document) {
        var modal = {
          close: function (event) {
            $('.image-modal').removeClass('opened');
            $('body').css('overflow', 'auto');
            $(document).unbind('keyup.modal');
          },
          open: function (event) {
            $('.image-modal').addClass('opened');
            $('body').css('overflow', 'hidden');
            $(document).on('keyup.modal', function (e) {
              if (e.keyCode == 27) { // escape key maps to keycode `27`
                modal.close();
              }
            })
          }
        }
        $('.product__images').on('click', '.js-open-modal', function (event) {
          modal.open();
        });
        $('.image-modal').on('click', '.js-close-modal', function (event) {
          modal.close();
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
          var url = Drupal.settings.shopify_enhancements.instances[key];
          Drupal.shopify_enhancements.createFilter(url, key).then(function(store) {
            Drupal.shopify_enhancements.stores.add(key, store);
          })
        }

        Drupal.shopify_enhancements.client = ShopifyBuy.buildClient({
          apiKey: '70d4172240cf29a471c73f66f30776fe',
          myShopifyDomain: Drupal.settings.shopify_enhancements.domain,
          appId: '6'
        });

      }
      // $.ajax({
      //   type: 'GET',
      //   url: 'https://' + settings.shopify_enhancements.domain + '/cart.json',
      //   dataType: 'jsonp',
      //   success: function (data) {
      //     console.log(data);
      //     var total = 0;
      //     for (i = 0; i < data.items.length; i++) {
      //       total += data.items[i].quantity;
      //     }
      //     $('#shopify-cart-total').text(total);
      //   }
      // });
    }
  };

}(jQuery));
