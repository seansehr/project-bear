import React, { PropTypes } from 'react'
import Product from './product'
import Masonry from 'react-masonry-component'

class ProductList extends React.Component {
  render() {
    return (
      <Masonry className="products_list">
        {/* prevents rendering issues: https://github.com/eiriklv/react-masonry-component/issues/11 */}
        <div style={{'width': '1px', 'height': 0}} />
        {this.props.products.map(item => {
          return <Product key={item.id} data={item} currency={this.props.currency}/>;
        })}
      </Masonry>
    )
  }
}

ProductList.propTypes = {
  currency: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
}

export default ProductList;