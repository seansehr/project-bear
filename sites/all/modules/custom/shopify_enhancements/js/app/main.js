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

window.Drupal.shopify_enhancements = window.Drupal.shopify_enhancements || {};
window.Drupal.shopify_enhancements.createCart = Cart;
window.Drupal.shopify_enhancements.createFilter = (products, container, categories = {}, sortOrders = Drupal.settings.shopify_enhancements.sortOrders) => {
  if (!products) {
    console.error('No products')
  }

  products.forEach(product => {
    product.shopify_product_metafields.forEach(metafield => {
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

  return store
}
