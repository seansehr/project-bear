/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  var self;
  Drupal.behaviors.shopify_enhancements_cart = {
    addToCart: function(pid, vid) {
      if (!pid || !vid) {
        return;
      }
      Drupal.shopify_enhancements.client.fetchProduct(pid).then(function(product) {
        var variant = product.variants.filter(function(n) {
          return n.id == vid
        })[0];
        return self.cart.addVariants({variant: variant, quantity: 1});
      }).then(function (c) {
        self.cart = createCart(c);
        self.cart.dom.open();
      });
    },

    attachEvents: function(context) {
      context = context || 'body';
      $(context).on('click', '.js-preview-atc', function (event) {
        event.preventDefault();
        var pid = $(this).data('product-id'),
            vid = $(this).data('variant-id');

        Drupal.behaviors.shopify_enhancements_cart.addToCart(pid, vid);
      });

      $(context).on('click', '.shopify-add-to-cart-button', function (event) {
        event.preventDefault();
        var pid = $(this).parents('form').data('product-id'),
            vid = $(this).parents('form').data('variant-id');

        Drupal.behaviors.shopify_enhancements_cart.addToCart(pid, vid);
      });

      $(context).on('click', '.js_cart_close', function (event) {
        self.cart.dom.close();
      });
      $(context).on('click', '.js_cart_toggle', function (event) {
        if (self.cart.lineItems.length) {
          self.cart.dom.toggle();
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
    },

    createCart: function(shopifyCart) {
      var $container = $('.cart-wrapper'),
          products = shopifyCart.lineItems;

      sessionStorage.setItem('cartid', shopifyCart.id);

      self.cartStore.dispatch({
        type: 'SET_PRODUCTS',
        products: products
      });

      self.$cartCount.text(shopifyCart.lineItems.length);

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
    },

    attach: function (context, settings) {
      if (context == document) {
        self = this;
        self.cartStore = Drupal.shopify_enhancements.createCart([], 'cart');
        self.$cartCount = $('#cart-count');

        Drupal.shopify_enhancements.stores.add('cart', self.cartStore);
        createCart = self.createCart;

        self.cartID = sessionStorage.getItem('cartid');

        if (self.cartID) {
          Drupal.shopify_enhancements.client.fetchCart(self.cartID).then(function (c) {
            self.cart = createCart(c);
          });
        }
        else {
          Drupal.shopify_enhancements.client.createCart().then(function (c) {
            self.cart = createCart(c);
          });
        }

        self.attachEvents(context);
      }
    }
  };

}(jQuery));
