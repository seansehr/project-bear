import React, { PropTypes } from 'react'
import FilterLink from '../containers/filterLink'
import Link from './link'

class ActiveFilters extends React.Component {
  render() {
    return (
      <div className="active-filter">
        {this.props.filters.length ? <Link active={false} className="clear-filters" onClick={this.props.clearFilter}>Clear Filters</Link>: ''}
        {this.props.filters.map((item, index) => {
          return (
            <FilterLink key={index} value={item.value} filterKey={item.key} className="active-filter__option">
              {item.value}
            </FilterLink>
          )
        })}
      </div>
    );
  }
};

ActiveFilters.propTypes = {
  filters: PropTypes.array.isRequired
}

export default ActiveFilters
