import React from 'react'
import classNames from 'classnames'

class Product extends React.Component {
  constructor(props) {
    props.data.display_price = props.data.display_price || props.data.price
    super(props)
  }

  render() {
    let product = this.props.data
    let priceBtnClass = classNames({
      'price__price': true,
      'price--compare': this.props.data.compare_at_price
    });
    return (
      <div className="cart__product row">
        <div className="cart__product-image ">
          <img src={product.image.src} />
        </div>
        <div className="cart__product-title">
          {product.title}
        </div>
        <div className="cart__product-price">
          {product.display_price}
        </div>
      </div>
    )
  }
}
// {/*<a href={"/product/" + this.props.data.id}>*/}
export default Product

// <div className="product_thumb">
//   <hr />
//   <div className="product_thumb__name">
//     {this.props.data.title}
//   </div>
//   <div className="product_thumb__vendor">
//     {this.props.data.vendor}
//   </div>
//   <div className="product_thumb__type">
//     {this.props.data.product_type}
//   </div>
//   <div className="product_thumb__price">
//     <span className="price__compare_at">{this.props.data.compare_at_price}</span>
//     <span className={priceBtnClass}>{this.props.data.price}</span>
//   </div>
// </div>
