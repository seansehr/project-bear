/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  var self;
  Drupal.behaviors.shopify_enhancements_currency = {
    init: function (fx) {
      self.currency = localStorage.getItem('currency') || 'USD';

      if (Drupal.shopify_enhancements.stores) {
        var productStore = {
          dispatch: function(action) {
            var $priceDom = $('[data-price]').each(function (index) {
              var $this = $(this),
                  price = $this.data('price');

              if (price) {
                action.currency.format = '%s %v';
                var newPrice = accounting.formatMoney(action.currency.converter(price), action.currency);
                $this.text(newPrice + ' ' + action.currency.key);
              }
            });
          }
        };

        Drupal.shopify_enhancements.stores.add('product', productStore);
      }

      self.changeCurrency(self.currency);
      self.inited = true;
    },

    getRates: function () {
      var promise = new Promise(function (resolve, reject) {
        var conversionRates = sessionStorage.getItem('conversionRates'),
            rates;
        if (conversionRates) {
          rates = JSON.parse(conversionRates)
          fx.rates = rates;
          fx.settings = {
            from: 'USD'
          }
          resolve(fx);
        }
        else {
          $.getJSON("http://api.fixer.io/latest?base=USD", function(data) {
            fx.rates = data.rates;
            fx.rates['USD'] = 1;
            fx.settings = {
              from: 'USD'
            }
            sessionStorage.setItem('conversionRates', JSON.stringify(fx.rates));
            resolve(fx);
          });
        }
      })
      return promise;
    },

    changeCurrency: function (currency) {
      self.getRates().then(function (fx) {
        self.currency = currency;
        localStorage.setItem('currency', currency);
        var symbol = currency == 'CAD' ? '$' : Drupal.settings.shopify_enhancements.currencies[currency],
            $symbol = $('.currency__symbol'),
            $name = $('.currency__name');

        if ($symbol.length && $name.length) {
          // Ignore the CAD symbol change.
          $symbol.html(Drupal.settings.shopify_enhancements.currencies[currency]);
          $name.text(currency);
        }

        Drupal.settings.shopify_enhancements.activeCurrency = {
          key: currency,
          symbol: symbol,
          converter: function (amount) {
            return accounting.toFixed(fx.convert(amount, {to: currency}), 2);
          }
        };

        Drupal.shopify_enhancements.stores.dispatchAll({
          type: 'SET_CURRENCY',
          currency: Drupal.settings.shopify_enhancements.activeCurrency
        }, true);
        $('a[data-code="' + this.currency + '"]').addClass('active');
      })
    },

    getParent() {
      return $('.js-currency').parents('.block-shopify-enhancements-currency');
    },

    attach: function (context, settings) {
      self = this;
      if (context == document) {
        self.getRates().then(self.init);
        $(document).on('click', function(event) {
          if(!$(event.target).closest('.js-currency').length) {
            if(self.getParent().hasClass('active')) {
              self.getParent().removeClass('active');
            }
          }
        });
        $('body').on('click', '.js-currency', function (event) {
          self.getParent().toggleClass('active');
          self.getParent().siblings('.opened').removeClass('opened');
        });
        $('.currency__selection').on('click', 'a', function (event) {
          event.preventDefault();
          $('.currency__selection a').removeClass('active');
          self.getParent().removeClass('active');
          var code = $(this).data('code');
          if (code) {
            self.changeCurrency(code);
          }
        });
      }
    }
  };

}(jQuery));
