import React from 'react'
import classNames from 'classnames'
import Link from '../../helpers/components/link'
import { format } from '../../helpers/price'

class CartItem extends React.Component {
  render() {
    let product = this.props.lineItem
    product.image = product.image || {src: ''};

    // Send updates back to the Shopify Cart.
    let addItem, removeItem, substractItem;
    if (!this.props.hideControls) {
      addItem = <Link active={false} className="cart__quantity--add" onClick={() => Drupal.shopifyEnhancements.cartUi.updateItem(this.props.lineItem.id, this.props.lineItem.quantity+1)}><i className="fa fa-caret-right" aria-hidden="true"></i></Link>;
      removeItem = <Link active={false} className="cart__remove" onClick={() => Drupal.shopifyEnhancements.cartUi.removeItem(this.props.lineItem.id)}><i className="icon icon-close" aria-hidden="true"></i><span className="show-for-sr">close</span></Link>;
      substractItem = <Link active={false} className="cart__quantity--subtract" onClick={() => Drupal.shopifyEnhancements.cartUi.updateItem(this.props.lineItem.id, this.props.lineItem.quantity-1)}><i className="fa fa-caret-left" aria-hidden="true"></i></Link>;
    }

    return (
      <div className="cart__product">
        <div className="cart__col--left">
          <div className="cart__image" dangerouslySetInnerHTML={{__html: product.image}}>
          </div>
        </div>
        <div className="cart__col--mid">
          <div className="cart__brand">
            {product.brand}
          </div>
          <div className="cart__title">
            {product.title}
          </div>
          <div className="cart__scale">
            Scale: {product.scale}
          </div>
          <div className="cart__quantity">
            <span>Quantity: </span>
            {substractItem}
            {product.quantity}
            {addItem}
          </div>
        </div>
        <div className="cart__col--right">
          <span className="cart__price">
            {format(this.props.currency.converter(product.price), this.props.currency)}
          </span>
          {removeItem}
        </div>
      </div>
    )
  }
}

export default CartItem
