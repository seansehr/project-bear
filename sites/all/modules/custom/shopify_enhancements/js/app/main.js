// main.js
import es6_collections from 'es6-collections'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// var ProductList = require('./components/product_list');
import App from './components'
import Cart from './cart'
import ProductReducers from './reducers'

// import products from './data'
window.Drupal.shopify_enhancements = window.Drupal.shopify_enhancements || {};
window.Drupal.shopify_enhancements.createCart = Cart;
window.Drupal.shopify_enhancements.createFilter = (url, container, filterCategories) => {
  let promise = new Promise((resolve, reject) => {
    jQuery.get(url, (data) => {
      let products = data.list;
      if (!products) {
        reject('No products')
      }
      filterCategories = {
        'product_type': {
          'name': 'Type',
          'options': []
        },
        'vendor': {
          'name': 'Brand',
          'options': [],
          'subfilter': 'product_type'
        },
        'size': {
          'name': 'Size',
          'options': [],
          'metafieldNamespace': 'c_f',
          'subfilter': 'vendor'
        }
      }

      for (let key in filterCategories) {
        let category = filterCategories[key]
        if (category.metafieldNamespace) {
          products.forEach(product => {
            product.shopify_product_metafields.forEach(m => {
              let metafield = m.shopify_metafield
              if (metafield.metafield_key == key && metafield.namespace == category.metafieldNamespace) {
                product[key] = metafield.value
              }
            })
          })
        }
      }

      let store = createStore(ProductReducers, {
          products,
          filterCategories
        },
        applyMiddleware(thunkMiddleware));

      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById(container)
      );

      resolve(store)
    })

  })
  return promise
}

// var createStore = require('redux').createStore;
// var Provider = Redux.provider;

// var cart = require('./cart/index.js');
// var Product = require('./product_filter/product.js');
// var Currency = require('./currency/index.js');

// let filterCategories = [{
//   'key': 'vendor',
//   'name': 'Brand',
//   'options': []
// },
// {
//   'key': 'product_type',
//   'name': 'Type',
//   'options': []
// }]

// // jQuery.get('http://drupal7.dev/shopify_product.json?variant_id=0', (data) => {
//   // let products = data.list;
//   let filterCategories = {
//     'product_type': {
//       'name': 'Type',
//       'options': []
//     },
//     'vendor': {
//       'name': 'Brand',
//       'options': [],
//       'subfilter': 'product_type'
//     },
//     'size': {
//       'name': 'Size',
//       'options': [],
//       'metafieldNamespace': 'attr',
//       'subfilter': 'vendor'
//     }
//   }
//
//   for (let key in filterCategories) {
//     let category = filterCategories[key]
//     if (category.metafieldNamespace) {
//       products.forEach(product => {
//         product.shopify_product_metafields.forEach(m => {
//           let metafield = m.shopify_metafield
//           if (metafield.metafield_key == key && metafield.namespace == category.metafieldNamespace) {
//             product[key] = metafield.value
//           }
//         })
//       })
//     }
//   }
//
//   let store = createStore(ProductReducers, {
//     products,
//     filterCategories
//   });
//
//   // render(
//   //   <Provider store={store}>
//   //     <App />
//   //   </Provider>,
//   //   document.getElementById('products')
//   // );
//
// // })

// let filterCategories = {
//   'product_type': {
//     'name': 'Type',
//     'options': []
//   },
//   'vendor': {
//     'name': 'Brand',
//     'options': []
//   },
//   'size': {
//     'name': 'Size',
//     'options': [],
//     'metafield': true
//   }
// }

// let store = createStore(ProductReducers, {
//   products,
//   filterCategories
// });

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('products')
// );
