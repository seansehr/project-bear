/*global Drupal: true, jQuery: true */
/*jslint devel: true, browser: true, sloppy: true, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  Drupal.behaviors.shopify_enhancements_stores = {
    attach: function (context, settings) {
      if (context == document) {
        Drupal.shopify_enhancements.stores = {
          add: function (id, store) {
            this.list[id] = store;
          },
          remove: function (id) {
            delete(this.list[id]);
          },
          dispatchAll: function (action) {
            if (typeof action === 'object') {
              for (var store in this.list) {
                if (this.list.hasOwnProperty(store)) {
                  this.list[store].dispatch(action);
                }
              }
            }
          },
          list: new Object(null)
        }
      }
    }
  };

}(jQuery));
