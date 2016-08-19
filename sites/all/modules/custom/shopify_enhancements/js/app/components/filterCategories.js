import React, { PropTypes } from 'react'
import FilterCategory from '../containers/filterCategory'
import { objectMap } from '../helpers/object'
import Link from './link'

class FilterList extends React.Component {
  render() {
    return (
      <div className="filter-list">
        {objectMap(this.props.filterCategories, (key, index) => {
          return (
            <FilterCategory key={key} value={key} className="filter-list__category">
              <span>{this.props.filterCategories[key].name}</span>
            </FilterCategory>
          );
        })}
        <Link className="filter-list__sort-button" active={false} onClick={this.props.sortOnClick}>
          Sort
        </Link>
      </div>
    )
  }
}

FilterList.propTypes = {
  filterCategories: PropTypes.object.isRequired
}

export default FilterList;
