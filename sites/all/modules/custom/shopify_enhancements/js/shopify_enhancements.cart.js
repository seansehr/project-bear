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
      var shopifyPromise = Drupal.shopify_enhancements.client.fetchProduct(pid);
      var sitePromise = self.fetchProduct(pid);

      // $.when doesn't work with Shopify promises, which are real promises
      // so we might aswell use them too.
      Promise.all([shopifyPromise, sitePromise]).then(function(values) {
        shopifyProduct = values[0];
        siteProduct = values[1];
        var variant = shopifyProduct.variants.filter(function(n) {
          return n.id == vid
        })[0];
        self.cart.addVariants({variant: variant, quantity: 1}).then(function (c) {
          self.cart = self.updateCart(c);
          var lineItem = self.cart.lineItems.filter(function (item) {
            return item.variant_id == variant.id;
          })[0];
          self.cartAddPopup($.extend({}, siteProduct, lineItem));
        });
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
        $('#cartModal').foundation('reveal', 'close');
      });
    },

    /**
      * Give a popup letting the user know they added item to cart.
      *
      * @param object lineItem
      *   The merged lineItem and site processed product item.
      */
    cartAddPopup: function(lineItem) {
      Drupal.shopify_enhancements.createCartItem(lineItem, Drupal.settings.shopify_enhancements.activeCurrency, 'cart-add');
      $cartAdd = $('.js-cart-add');
      $cartAdd.addClass('opened');
      window.setTimeout(function () {
        $cartAdd.css('height', 'auto').removeClass('opened');
        // Time the height with the fadeout.
        window.setTimeout(function () {
          $cartAdd.css('height', '');
        }, 500);
      }, 3000);
    },

    /**
      * Cache a product to prevent excess html requests
      *
      * @param object shopifyCart
      *   The Shopify Cart object to use for data.
      *
      * @param object currency
      *   Currency to display prices in.
      *
      * @return undefined
      *    Updates the cart UI.
      */
    updateCart: function(shopifyCart, currency) {
      var $container = $('.cart-wrapper'),
          lineItems = shopifyCart.lineItems;

      currency = currency || Drupal.settings.shopify_enhancements.activeCurrency;

      sessionStorage.setItem('cartid', shopifyCart.id);
      var defers = shopifyCart.lineItems.map(function (lineItem) {
        return self.fetchProduct(lineItem.product_id);
      });

      $.when.apply($, defers).then(function () {
        var lineItems = [],
            products = Array.prototype.slice.call(arguments);
        for (index in shopifyCart.lineItems) {
          var product = products.filter(function (product) {
            return product.product_id == shopifyCart.lineItems[index].product_id;
          })[0];
          var lineItem = $.extend({}, product, shopifyCart.lineItems[index]);
          lineItems.push(lineItem);
        }
        self.cartUi = Drupal.shopify_enhancements.createCart(lineItems, currency, 'cart');
      })

      var quantity = shopifyCart.lineItems.reduce(function (pre, cur) {
        return pre + cur.quantity;
      }, 0);
      self.$cartCount.text(quantity);
      return shopifyCart;
    },

    /**
      * Cache a product to prevent excess html requests
      *
      * @param object product
      *   The product object from Shopify.
      *
      * @return object
      *    Saves the mapped object and returns it.
      */
    cacheProduct: function (product) {
      var cacheId = 'cache-' + product.product_id,
          productMapped = self.mapProduct(product);
      sessionStorage.setItem(cacheId, JSON.stringify(productMapped));
      return productMapped;
    },

    /**
      * Fetch info about a product it and cache it.
      *
      * @param integer pid
      *   The product id from Shopify.
      *
      * @return $.Deferred
      *    The jQuery deferred which will resolve to the product.
      */
    fetchProduct: function (pid) {
      var deferred = $.Deferred(),
          cacheId = 'cache-' + pid,
          cache = JSON.parse(sessionStorage.getItem(cacheId));

      if (cache) {
        deferred.resolve(cache);
      }
      else {
        $.get('/shopify_product.json?variant_id=0&product_id=' + pid).then(function(data) {
          if (data.list.length) {
            var product = self.cacheProduct(data.list[0]);
            deferred.resolve(product);
          }
          else {
            deferred.reject('No product found.')
          }
        });
      }
      return deferred;
    },

    /**
      * Map attributes from Shopify Product to make it easier in React.
      *
      * @param object product
      *   The product id from Shopify.
      *
      * @return object
      *    The simplified object map.
      */
    mapProduct: function (product) {
      if (product.mapped === true) {
        return product;
      }
      var price = product.variants[0].price;
      var size = product.shopify_product_metafields.filter(function (metafield) {
        return metafield.shopify_metafield.metafield_key == 'size';
      }).map(function (metafield) {
        return metafield.shopify_metafield.value;
      });
      var image = product.shopify_product_images.length ? product.shopify_product_images[0].file.url : null;
      return {
        brand: product.vendor,
        image: image,
        mapped: true,
        price: price,
        product_id: product.product_id,
        scale: size.length ? size[0] : null,
        title: product.title
      }
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
