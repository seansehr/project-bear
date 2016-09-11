/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  var self;

  Drupal.shopifyEnhancements = Drupal.shopifyEnhancements || {};
  Drupal.shopifyEnhancements.cartUi = Drupal.shopifyEnhancements.cartUi || {};

  Drupal.shopifyEnhancements.cartUi.updateItem = function (lid, quantity) {
    self.cart.updateLineItem(lid, quantity).then(self.updateCart);
  }

  Drupal.shopifyEnhancements.cartUi.removeItem = function (lid) {
    self.cart.removeLineItem(lid).then(self.updateCart);
  }

  Drupal.behaviors.shopify_enhancements_cart = {
    addToCart: function(pid, vid) {
      if (!pid || !vid) {
        return;
      }
      Drupal.shopify_enhancements.client.fetchProduct(pid).then(function(product) {
        var variant = product.variants.filter(function(n) {
          return n.id == vid
        })[0];
        self.cart.addVariants({variant: variant, quantity: 1}).then(function (c) {
          self.cart = self.updateCart(c);
          self.cartUi = Drupal.shopify_enhancements.createCart(c.lineItems, self.cartUi.props.currency, 'cart');
          self.tooltip(Drupal.t('@product added to cart', {'@product': product.title}));
        });;
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

      $(context).on('click', '.js_cart_toggle', function (event) {
        if (self.cart.lineItems.length) {
          self.cart.dom.toggle();
        }
        else {
          self.tooltip(Drupal.t('Cart is empty'));
        }
      });
    },

    updateCart: function(shopifyCart, currency) {
      var $container = $('.cart-wrapper'),
          lineItems = shopifyCart.lineItems;

      currency = currency || self.cartUi.props.currency;

      sessionStorage.setItem('cartid', shopifyCart.id);
      self.cartUi = Drupal.shopify_enhancements.createCart(shopifyCart.lineItems, currency, 'cart');
      self.$cartCount.text(self.cartUi.props.lineItems.length);
      return shopifyCart;
    },

    tooltip: function (content) {
      var $tooltip = $('.cart-button .tooltip');
      $tooltip.text(content).css('left', function() {
        return 60-$tooltip.outerWidth();
      }).fadeIn(300, function () {
        window.setTimeout(function () {
          $tooltip.fadeOut(300);
        }, 2000);
      });
    },

    attach: function (context, settings) {
      if (context == document) {
        self = this;
        self.$cartCount = $('#cart-count');
        self.cartID = sessionStorage.getItem('cartid');

        if (self.cartID) {
          cartPromise = Drupal.shopify_enhancements.client.fetchCart(self.cartID);
        }
        else {
          cartPromise = Drupal.shopify_enhancements.client.createCart();
        }

        cartPromise.then(function (c) {
          var defaultCurrency = {
            key: 'USD',
            symbol: '$',
            converter: function (price) {
              return price;
            }
          }
          self.cart = self.updateCart(c, defaultCurrency);
          Drupal.shopify_enhancements.stores.add('cart', {
            dispatch: function (action) {
              self.cart = self.updateCart(self.cart, action.currency);
            }
          });
        });

        self.attachEvents(context);
      }
    }
  };

}(jQuery));
