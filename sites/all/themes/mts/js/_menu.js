(function($) {
  window.getMenuProducts = function () {
    if (Drupal.settings.mts.ids.length) {
      var query = Drupal.settings.mts.ids.join('&id[]=');
      $.get('/shopify_product.json?image_style=product_list&variant_id=0&id[]=' + query).then(function(data) {
        if (data.list.length) {
          Drupal.settings.mts.products = Drupal.settings.mts.products || {};
          data.list.forEach(function (product) {
            Drupal.settings.mts.products[product.id] = product;
          });
        }
      });
    }
  };

  Foundation.libs.topbar.events = function (bar) {
    var self = this,
        S = this.S;

    S(this.scope)
      .off('.topbar')
      .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
        e.preventDefault();
        self.toggle(this);
      })
      .on('click.fndtn.topbar','.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]',function (e) {
          var li = $(this).closest('li');
          if(self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown'))
          {
          self.toggle();
          }
      })
      .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
        var li = S(this),
            target = S(e.target),
            topbar = li.closest('[' + self.attr_name() + ']'),
            settings = topbar.data(self.attr_name(true) + '-init');

        if(target.data('revealId')) {
          self.toggle();
          return;
        }

        if (self.breakpoint()) {return;}
        if (settings.is_hover && !Modernizr.touch) {return;}

        e.stopImmediatePropagation();

        if (li.hasClass('hover')) {
          li
            .removeClass('hover')
            .find('li')
            .removeClass('hover');

          li.parents('li.hover')
            .removeClass('hover');
        } else {
          li.addClass('hover');

          $(li).siblings().removeClass('hover');

          if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
            e.preventDefault();
          }
        }
      })
      .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {

        if (self.breakpoint()) {
          e.preventDefault();

          var $this = S(this),
              topbar = $this.closest('[' + self.attr_name() + ']'),
              section = topbar.find('section, .top-bar-section'),
              dropdownHeight = $this.next('.dropdown').outerHeight(),
              $selectedLi = $this.closest('li');

          topbar.data('index', topbar.data('index') + 1);
          $selectedLi.addClass('moved');
          if (!self.rtl) {
            section.css({left: -(100 * topbar.data('index')) + '%'});
            section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
          } else {
            section.css({right: -(100 * topbar.data('index')) + '%'});
            section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
          }

          topbar.css('height', $this.siblings('.dropdown').outerHeight(true) + topbar.data('height'));
        }
      });

    S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function() {
        self.resize.call(self);
    }, 50)).trigger('resize').trigger('resize.fndtn.topbar').load(function(){
        // Ensure that the offset is calculated after all of the pages resources have loaded
        S(this).trigger('resize.fndtn.topbar');
    });

    S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
      var parent = S(e.target).closest('li').closest('li.hover');

      if (parent.length > 0) {
        return;
      }

      S('[' + self.attr_name() + '] li.hover').removeClass('hover');
    });

    // Go up a level on Click
    S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
      e.preventDefault();

      var $this = S(this),
          topbar = $this.closest('[' + self.attr_name() + ']'),
          section = topbar.find('section, .top-bar-section'),
          settings = topbar.data(self.attr_name(true) + '-init'),
          $movedLi = $this.closest('li.moved'),
          $previousLevelUl = $movedLi.parent();

      topbar.data('index', topbar.data('index') - 1);

      if (!self.rtl) {
        section.css({left: -(100 * topbar.data('index')) + '%'});
        section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
      } else {
        section.css({right: -(100 * topbar.data('index')) + '%'});
        section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
      }

      if (topbar.data('index') === 0) {
        topbar.css('height', '');
      } else {
        topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
      }

      setTimeout(function () {
        $movedLi.removeClass('moved');
      }, 300);
    });

    // Show dropdown menus when their items are focused
    S(this.scope).find('.dropdown a')
      .focus(function() {
        $(this).parents('.has-dropdown').addClass('hover');
      })
      .blur(function() {
        $(this).parents('.has-dropdown').removeClass('hover');
      });
  };
}(jQuery));
