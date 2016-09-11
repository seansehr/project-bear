import React from 'react'
import classNames from 'classnames'
import { fieldValue } from '../helpers/fields'
import Link from './link'
import { format } from '../helpers/price'

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

    data.display_price = format(props.currency.converter(data.price), props.currency)
    if (data.compare_at_price) {
      data.display_compare_at_price = format(props.currency.converter(data.compare_at_price), props.currency)
    }

    let images = data.shopify_product_images;
    data.image = images[0] ? images[0].file.url : '';
    data.hover_image = images[1] ? images[1].file.url : '';
    data.tags = data.shopify_product_tags.filter(tag => {
      return !!parseInt(fieldValue(tag.taxonomy_term.field_status_marker), 10)
    })
    data.url = "/" + data.url
  }

  render() {
    let priceBtnClass = classNames({
      'price__price': true,
      'price--compare': this.props.data.compare_at_price
    });

    return (
      <div className="product_thumb">
        <div className="product_thumb__inner">
          <div className="product_thumb__image">
            <a href={this.props.data.url} dangerouslySetInnerHTML={{__html: this.props.data.image}} />
            <div className="product_thumb__image--hover">
              <a href={this.props.data.url} dangerouslySetInnerHTML={{__html: this.props.data.hover_image}} />
            </div>
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
              {this.props.data.tags.map(tag => {
                let name = tag.taxonomy_term.name
                let key = name.replace(/\s+/g, '-').toLowerCase()
                let color = fieldValue(tag.taxonomy_term.field_color, 'jquery_colorpicker')
                let style = color ? {color: '#' + color} : {}
                return <span key={key} className={'product__status--' + key} style={style}>{name}</span>;
              })}
              {this.props.data.status}
            </div>
            <div className="product_thumb__price">
              <a href={this.props.data.url}><span className="price__compare_at">{this.props.data.display_compare_at_price}</span>
              <span className={priceBtnClass}>{this.props.data.display_price}</span></a>
            </div>
          </div>
          <div className="product_thumb__info on-hover">
            <a href={this.props.data.url} className="product_thumb__name">
              {this.props.data.title}
            </a>
            <div className="product_thumb__actions">
              <Link role="button" href="#" className="specs" active={false} onClick={this.props.onClick}>
                <i className="fa fa-cart-plus" aria-hidden="true"></i>
                <span className="show-for-sr">Add {this.props.data.title} to Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
