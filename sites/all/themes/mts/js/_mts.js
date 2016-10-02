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
        $('.l-header-region-wrapper').height($header.outerHeight());

        var topbarWaypoint = new Waypoint({
          element: $('.top-bar-wrapper')[0],
          offset: function() {
            return -this.element.clientHeight;
          },
          handler: function (direction) {
            if (direction === 'down') {
              topBarHide = true;
            }
            else {
              topBarHide = false;
            }
          }
        });

        var lastScrollTop = 0;
        $(window).scroll(
          debounce(function () {
            var st = $(this).scrollTop();
            if (topBarHide) {
              if (st > lastScrollTop) {
                $topBar.removeClass('visible');
                $header.removeClass('menu-visible');
              }
              else {
                $topBar.addClass('visible');
                $header.addClass('menu-visible');
              }
            }
            lastScrollTop = st;
          }, 10)
        );

        // var $brandInfo = $('.js-brand-sticky');
        // if ($brandInfo.length) {
        //   var stickiedClass = 'sticked',
        //       $topbar = $('.top-bar'),
        //   waypoint = new Waypoint({
        //     element: $brandInfo[0],
        //     handler: function(direction) {
        //       switch(direction) {
        //         case 'down':
        //           $brandInfo.height($brandInfo.height());
        //           console.log($topbar.offset().top +'+'+ $topbar.height());
        //           $brandInfo.css('top', $topbar.height());
        //           $brandInfo.addClass(stickiedClass);
        //           break;
        //         case 'up':
        //           $brandInfo.height('auto');
        //           $brandInfo.removeClass(stickiedClass);
        //           break;
        //         default:
        //       }
        //     },
        //     offset: function () {
        //       return -this.element.clientHeight;
        //     }
        //   });
        // }
      }

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
