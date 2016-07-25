/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements = {
    attach: function (context, settings) {
      if (context == document) {
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

        var cartStore = Drupal.shopify_enhancements.createCart([], 'cart'),
            $cartCount = $('#cart-count');
        Drupal.shopify_enhancements.stores.add('cart', cartStore);
        var createCart = function (shopifyCart) {
          var $container = $('.cart-wrapper'),
              products = shopifyCart.lineItems;

          sessionStorage.setItem('cartid', shopifyCart.id);
          cartStore.dispatch({
            type: 'SET_PRODUCTS',
            products: products
          });
          $cartCount.text(shopifyCart.lineItems.length);
          shopifyCart.dom = {
            close: function () {
              $container.removeClass('opened');
            },
            open: function () {
              $container.addClass('opened');
            },
            toggle: function () {
              $('.cart-wrapper').toggleClass('opened');
            }
          }

          return shopifyCart;
        }

        Drupal.shopify_enhancements.client = ShopifyBuy.buildClient({
          apiKey: Drupal.settings.shopify_enhancements.apiKey,
          myShopifyDomain: Drupal.settings.shopify_enhancements.domain,
          appId: '6'
        });

        var cartID = sessionStorage.getItem('cartid'),
            cart,
            product = {
              'variants': []
            };

        if (cartID) {
          Drupal.shopify_enhancements.client.fetchCart(cartID).then(function (c) {
            cart = createCart(c);
          });
        }
        else {
          Drupal.shopify_enhancements.client.createCart().then(function (c) {
            cart = createCart(c);
          });
        }

        if (settings.shopify_enhancements.productID) {
          Drupal.shopify_enhancements.client.fetchProduct(settings.shopify_enhancements.productID).then(function(p) {
            product = p;
          });
        }

        $('body').on('click', '.shopify-add-to-cart-button', function (event) {
          var variantID = $(this).parents('form').data('variant-id'),
              variant = product.variants.filter(function(v) {
                return v.id == variantID;
              })[0];
          if (!variant) {
            return;
          }

          event.preventDefault();
          cart.addVariants({variant: variant, quantity: 1}).then(function (c) {
            cart = createCart(c);
            cart.dom.open();
          });
        });

        $('body').on('click', '.js_cart_close', function (event) {
          cart.dom.close();
        });
        $('body').on('click', '.js_cart_toggle', function (event) {
          if (cart.lineItems.length) {
            cart.dom.toggle();
          }
          else {
            var $tooltip = $('.tooltip', this);
            $tooltip.fadeIn(300, function () {
              window.setTimeout(function () {
                $tooltip.fadeOut(300);
              }, 2000);
            })
          }
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
