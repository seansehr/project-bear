// main.js
import React, { PropTypes } from 'react'
import CartItem from './cartItem'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.products.map(item => {
          return <CartItem key={item.id} data={item} currency={this.props.currency}/>;
        })}
      </div>
    );
  }
};

Cart.propTypes = {
  products: PropTypes.array.isRequired
}

export default Cart
