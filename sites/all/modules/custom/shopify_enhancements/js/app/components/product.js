import React from 'react'
import classNames from 'classnames'

class Product extends React.Component {
  constructor(props) {
    super(props)
    let data = this.props.data;
    let variantProps = ['compare_at_price', 'price'];

    if (data.variants.constructor === Array && typeof data.variants[0] === 'object') {
      let primaryVariant = data.variants[0];
      variantProps.forEach(function (prop, index) {
        if (!data[prop] && primaryVariant[prop]) {
          data[prop] = primaryVariant[prop];
        }
      });
    }

    data.display_price = data.display_price || data.price

    let images = data.shopify_product_images;
    data.image = images[0] ? images[0].file.url : '';
    data.hover_image = images[1] ? images[1].file.url : '';
  }

  render() {
    let priceBtnClass = classNames({
      'price__price': true,
      'price--compare': this.props.data.compare_at_price
    });
    return (
      <div link="/product/{this.props.data.handle}" className="product_thumb">
        <div className="product_thumb__inner">
          <div className="product_thumb__image">
            <div dangerouslySetInnerHTML={{__html: this.props.data.image}} />
          <div className="product_thumb__image--hover" dangerouslySetInnerHTML={{__html: this.props.data.hover_image}} />
          </div>
          <div className="product_thumb__info top">
            <div className="product_thumb__vendor">
              {this.props.data.vendor}
            </div>
            <div className="product_thumb__size">
              {this.props.data.size}
            </div>
          </div>
          <div className="product_thumb__info bottom">
            <div className="product_thumb__status">
              {this.props.data.status}
            </div>
            <div className="product_thumb__price">
              <span className="price__compare_at">{this.props.data.compare_at_price}</span>
              <span className={priceBtnClass}>{this.props.data.display_price}</span>
            </div>
          </div>
          <div className="product_thumb__info on-hover">
            <div className="product_thumb__name">
              {this.props.data.title}
            </div>
            <div className="product_thumb__actions">
              <i className="fa fa-info" aria-hidden="true"></i><span className="show-for-sr">more info</span>
              <a role="button" href="#" className="specs"><i className="fa fa-cart-plus" aria-hidden="true"></i><span className="show-for-sr">Add {this.props.data.title} to Cart</span></a>
            </div>
          </div>
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
