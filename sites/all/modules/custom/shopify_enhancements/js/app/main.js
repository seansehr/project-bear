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
window.Drupal.shopify_enhancements.createFilter = (url, container, categories = {}, sortOrders = Drupal.settings.shopify_enhancements.sortOrders) => {
  let promise = new Promise((resolve, reject) => {
    jQuery.get(url, (data) => {
      let products = data.list;
      if (!products) {
        reject('No products')
      }

      products.forEach(product => {
        product.shopify_product_metafields.forEach(m => {
          let metafield = m.shopify_metafield
          product[metafield.metafield_key] = metafield.value
        })
      })

      let sort = {
        key: "title",
        opened: false,
        order: "asc",
        sortOrders
      }

      let store = createStore(ProductReducers, {
          products,
          categories,
          sort
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
