/**
 * @file
 * Create a Cart React rendering.
 *
 * Not using Redux because the Shopify cart item should be the one source of truth.
 */

import React from 'react'
import { render } from 'react-dom'

import Cart from './components/cart'

export default (lineItems, currency, container) => {
  return render(
    <Cart lineItems={lineItems} currency={currency} />,
    document.getElementById(container)
  );
}
