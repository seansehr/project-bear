import React, { PropTypes } from 'react'
import Category from '../containers/category'
import { objectMap } from '../../helpers/object'
import Link from '../../helpers/components/link'

class FilterList extends React.Component {
  render() {
    let size = false
    if (typeof this.props.categories['size'] === 'object') {
      size = <Category key='size' value='size' className="product-list__category--size"><span>{this.props.categories['size'].name}</span></Category>
    }
    return (
      <div className="product-list__header clearfix">
      {size}
        <div className="product-list__categories">
          {objectMap(this.props.categories, (key, index) => {
            if (key !== 'size') {
              return (
                <Category key={key} value={key} className="product-list__category">
                  <span>{this.props.categories[key].name}</span>
                </Category>
              );
            }
          })}
        </div>
        <Link className="product-list__sort" active={this.props.sortOpened} onClick={this.props.sortOnClick}>
          Sort By
        </Link>
      </div>
    )
  }
}

FilterList.propTypes = {
  categories: PropTypes.object.isRequired
}

export default FilterList;
