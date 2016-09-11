/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements_stores = {
    attach: function (context, settings) {
      if (context == document) {
        Drupal.shopify_enhancements.stores = {
          add: function (id, store) {
            this.list[id] = store;
            for (var action in this.reinit) {
              this.dispatch(store, this.reinit[action]);
            }
          },
          remove: function (id) {
            delete(this.list[id]);
          },
          dispatch: function(store, action) {
            if (store.hasOwnProperty('dispatch')) {
              store.dispatch(action);
            }
            else {
              store.dispatch(action);
            }
          },
          dispatchAll: function (action, reinit) {
            if (reinit) {
              this.reinit.push(action)
            }
            for (var store in this.list) {
              if (this.list.hasOwnProperty(store)) {
                this.dispatch(this.list[store], action)
              }
            }
          },
          list: new Object(null),
          reinit: []
        }
      }
    }
  };

}(jQuery));
