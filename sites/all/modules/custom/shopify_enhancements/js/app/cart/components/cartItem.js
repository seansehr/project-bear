import React from 'react'
import classNames from 'classnames'
import Link from '../../components/link'
import { convertAndFormat } from '../../helpers/price'

class CartItem extends React.Component {
  render() {
    let product = this.props.lineItem
    product.image = product.image || {src: ''};

    // Send updates back to the Shopify Cart.
    let updateItem = Drupal.shopifyEnhancements.cartUi.updateItem
    let removeItem = Drupal.shopifyEnhancements.cartUi.removeItem

    return (
      <div className="cart__product">
        <div className="cart__product-image ">
          <img src={product.image.src} />
        </div>
        <div className="cart__col--mid">
          <div className="cart__product-title">
            {product.title}
          </div>
          <div className="cart__quantity">
            <span>Quantity: </span>
            <Link active={false} className="cart__quantity--subtract" onClick={() => updateItem(this.props.lineItem.id, this.props.lineItem.quantity-1)}><i className="fa fa-caret-left" aria-hidden="true"></i></Link>
            {product.quantity}
            <Link active={false} className="cart__quantity--add" onClick={() => updateItem(this.props.lineItem.id, this.props.lineItem.quantity+1)}><i className="fa fa-caret-right" aria-hidden="true"></i></Link>
          </div>
        </div>
        <div className="cart__col--right">
          <Link active={false} className="cart__remove" onClick={() => removeItem(this.props.lineItem.id)}>
            <i className="icon icon-close" aria-hidden="true"></i>
            <span className="show-for-sr">close</span>
          </Link>
          <div className="cart__product-price">
            {convertAndFormat(product.price, this.props.currency)}
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
