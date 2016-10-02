/**
 * @file
 * Create a Cart React rendering.
 *
 * Not using Redux because the Shopify cart item should be the one source of truth.
 */

import React from 'react'
import { render } from 'react-dom'

import CartComp from './components/cart'
import CartItemComp from './components/cartItem'

export const Cart = (lineItems, currency, container) => {
  return render(
    <div><CartComp lineItems={lineItems} currency={currency} /></div>,
    document.getElementById(container)
  );
}

export const CartItem = (lineItem, currency, container) => {
  render(
    <CartItemComp lineItem={lineItem} currency={currency} hideControls={true} />,
    document.getElementById(container)
  );
}
