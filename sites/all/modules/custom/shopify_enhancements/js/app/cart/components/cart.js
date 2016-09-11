/**
 * @file
 * Cart React component.
 */

import React, { PropTypes } from 'react'
import CartItem from './cartItem'
import { format } from '../../helpers/price'

class Cart extends React.Component {
  render() {
    let subtotal = this.props.lineItems.reduce((pre, cur) => {
      // Total in the specificed currency to avoid rounding issues.
      return pre + (this.props.currency.converter(cur.price) * cur.quantity);
    }, 0);

    return (
      <div>
        <div>
          {this.props.lineItems.map(item => {
            return <CartItem key={item.id} lineItem={item} currency={this.props.currency}/>;
          })}
        </div>
        <div className="cart__subtotal">
          <span className="subtotal__label">Subtotal:</span>{format(subtotal, this.props.currency)}
        </div>
      </div>
    );
  }
};

Cart.propTypes = {
  lineItems: PropTypes.array.isRequired
}

export default Cart
