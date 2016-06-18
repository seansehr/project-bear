/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements_currency = {
    init: function (data) {
      var self = this;
      this.currency = localStorage.getItem('currency') || 'USD';
      fx.settings = {
        from: 'USD'
      }
      fx.rates = data;

      if (Drupal.shopify_enhancements.stores) {
        var productStore = function() {
          var $priceDom = $('.shopify-price'),
              price = $priceDom.text().replace(/[^0-9.,]/g,'');

          return {
            dispatch: function(action) {
              if ($priceDom.length && price) {
                self.convert(price, action.key).then(function(np) {
                  newPrice = action.symbol + ' ' + np + ' ' + action.key;
                  $priceDom.text(newPrice);
                });
              }
            }
          }
        };
        var headerStore = function() {
          var $symbol = $('.currency__symbol'),
              $name = $('.currency__name');

          return {
            dispatch: function(action) {
              if ($symbol.length && $name.length) {
                $symbol.text(action.symbol);
                $name.text(action.key);
              }
            }
          }
        }.bind(this);
        Drupal.shopify_enhancements.stores.add('product', productStore());
        Drupal.shopify_enhancements.stores.add('header', headerStore());
      }

      if (this.currency !== 'USD') {
        this.changeCurrency(this.currency);
      }
      this.inited = true;
    },

    changeCurrency: function (currency) {
      this.currency = currency;
      localStorage.setItem('currency', currency);
      Drupal.shopify_enhancements.stores.dispatchAll({
        type: 'CURRENCY_CHANGE',
        key: currency,
        symbol: Drupal.settings.shopify_enhancements.currencies[currency]
      });
      $('.currency__selection a[data-code="' + currency + '"]').addClass('active');
    },

    convert: function (amt, to) {
      // Make it a promise incase we are still fetching rates.
      var self = this;
      var promise = new Promise(function(resolve, reject) {
        (function convert() {
          if (self.inited) {
            amt = parseInt(amt, 10);
            if (isNaN(amt) || typeof to !== 'string') {
              reject('Amount is NaN.');
            }
            resolve(fx.convert(amt, {to: to}).toFixed(2));
          }
          else {
            setTimeout(function() {
              convert(amt, to);
            }, 500);
          }
        }());
      });
      return promise;
    },

    attach: function (context, settings) {
      var self = this;
      if (context == document) {
        var conversionRates = sessionStorage.getItem('conversionRates');
        if (conversionRates) {
          self.init(JSON.parse(conversionRates));
        }
        else {
          $.getJSON("http://api.fixer.io/latest?base=USD", function(data) {
            data.rates['USD'] = 1;
            sessionStorage.setItem('conversionRates', JSON.stringify(data.rates));
            self.init(data.rates);
          });
        }
        $('body').on('click', '.currency__active', function (event) {
          $(this).parents('.currency').toggleClass('active');
        });
        $('.currency__selection').on('click', 'a', function (event) {
          event.preventDefault();
          $('.currency__selection a').removeClass('active');
          $('.currency').removeClass('active');
          var code = $(this).data('code');
          if (code) {
            self.changeCurrency(code);
          }
        });
      }
    }
  };

}(jQuery));