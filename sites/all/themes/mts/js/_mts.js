/* Implement custom javascript here */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {func.apply(context, args);}
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {func.apply(context, args);}
  };
}

(function($) {
  Drupal.behaviors.mts = {
    attach: function(context, settings) {
      if (context === document) {
        var attachTabs = function () {
          var setTab = function (tab) {
            $('a, div', '.product__tabs, .product__tab-content').removeClass('active');
            $('.' + tab, '.product__tabs, .product__tab-content').addClass('active');
          };

          $('.product__tabs').on('click', 'a', function (event) {
            event.preventDefault();
            setTab($(this).attr('data-tab'));
          });

          setTab('description');
        };

        attachTabs();

        // Control the sticky menus.
        var topBarHide = false;
        var $topBar = $('.top-bar-fixed');
        var $header = $('.l-header-region');
        var $backToTop = $('.js-back-to-top');
        // $('.l-header-region-wrapper').height($header.outerHeight());

        var topbarWaypoint = new Waypoint({
          element: $('.top-bar-wrapper')[0],
          offset: function() {
            return -this.element.clientHeight;
          },
          handler: function (direction) {
            if (direction === 'down') {
              topBarHide = true;
              $backToTop.addClass('visible');
            }
            else {
              $backToTop.removeClass('visible');
              topBarHide = false;
            }
          }
        });

        var lastScrollTop = 0;
        $(window).scroll(
          function () {
            var st = $(this).scrollTop();
            if (topBarHide) {
              if (st > lastScrollTop) {
                $topBar.removeClass('visible');
                $header.removeClass('menu-visible');
              }
              else {
                $topBar.addClass('visible');
                $header.addClass('menu-visible');
                $backToTop.removeClass('visible');
              }
            }
            lastScrollTop = st;
          }
        );

        $backToTop.on('click', function (event) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        var $brandInfo = $('.js-brand-info', context);
        var $brandToggle = $('.js-brand-toggle', context);

        $brandToggle.on('click', function (event) {
          if ($brandInfo.hasClass('active') !== $brandToggle.hasClass('active')) {
            $brandInfo.removeClass('active');
            $brandToggle.removeClass('active');
          }
          else {
            $brandInfo.toggleClass('active');
            $brandToggle.toggleClass('active');
          }
        });

        var interval = false;
        var timeout = false;
        var marquee = function() {
          if ($('body').width() > 641) {
            var $siteMessage = $('.block-block-4', context);
            var $siteMessageChildren = $siteMessage.children();
            var siteMessageWidth = 0;
            $siteMessage.off();
            $siteMessageChildren.each(function () {
              siteMessageWidth += $(this).width();
            });
            if (siteMessageWidth > $siteMessage.width()) {
              var $firstChild = $siteMessageChildren.first();
              if (!interval && !timeout) {
                timeout = window.setTimeout(function () {
                  interval = window.setInterval(function () {
                    $firstChild.css('margin-left', '-=1');
                    if (parseInt($firstChild.css('margin-left'), 10) < (siteMessageWidth * -1)) {
                      console.log(siteMessageWidth);
                      $firstChild.css('margin-left', $siteMessage.width());
                    }
                  }, 22);
                }, 3000);
              }
            }
          }
          else {
            clearInterval(interval);
            clearTimeout(timeout);
            interval = false;
            timeout = false;
            $('.block-block-4', context).children().first().css('margin-left', '0');
            $('.block-block-4', context).off().on('click', function (event) {
              $(this).toggleClass('hide-message');
            });
          }
        };
        $(window).on('resize', marquee);
        marquee();

        getMenuProducts();
      } // end context === document

      $(context).on('mouseenter', '.product-dropdown', function () {
        var $this = $(this);
        var $productContainers = $this.parents('.dropdown').find('.js-dropdown-products .product-container');
        var productIds = $this.attr('data-products').split(',');
        $productContainers.each(function (i) {
          var productId = productIds[i];
          if (productId && Drupal.settings.mts.products && Drupal.settings.mts.products[productId]) {
            var product = Drupal.settings.mts.products[productId];
            Drupal.shopify_enhancements.createProduct(Drupal.settings.mts.products[productId], Drupal.settings.shopify_enhancements.activeCurrency, $productContainers.get(i));
          }
          else {
            $productContainers.get(i).innerHTML = '';
          }
        });
      });

      if (typeof Drupal.settings.flexslider !== 'undefined') {
        var start = function(event) {
          var target = event.target;
          $('.flex-direction-nav', target).appendTo('.flex-viewport', target);
        };
        for (var instance in Drupal.settings.flexslider.instances) {
          if (Drupal.settings.flexslider.instances[instance] === 'product') {
            $('#' + instance).on('start', start);
          }
        }
      }
    }
  };
}(jQuery));
