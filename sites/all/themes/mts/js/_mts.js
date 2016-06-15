/* Implement custom javascript here */

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
