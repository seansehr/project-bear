// main.js
import es6_collections from 'es6-collections'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import ProductList from './productList/components'
import ProductReducers from './productList/reducers'
import Cart from './cart'

// import products from './data'
window.Drupal.shopify_enhancements = window.Drupal.shopify_enhancements || {};
window.Drupal.shopify_enhancements.createCart = Cart;
window.Drupal.shopify_enhancements.createFilter = (url, container, categories) => {
  let promise = new Promise((resolve, reject) => {
    jQuery.get(url, (data) => {
      let products = data.list;
      if (!products) {
        reject('No products')
      }
      if (!categories) {
        categories = {
          'product_type': {
            'name': 'Type',
            // 'options': []
          },
          'vendor': {
            'name': 'Brand',
            // 'options': [],
            'subfilter': 'product_type'
          },
          'size': {
            'name': 'Size',
            // 'options': [],
            'metafieldNamespace': 'c_f',
            'subfilter': 'vendor'
          }
        }
      }

      for (let key in categories) {
        let category = categories[key]
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
          categories
        },
        applyMiddleware(thunkMiddleware));

      render(
        <Provider store={store}>
          <ProductList />
        </Provider>,
        document.getElementById(container)
      );

      resolve(store)
    })

  })
  return promise
}
