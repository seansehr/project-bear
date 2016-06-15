import React, { PropTypes } from 'react'
import FilterLink from '../containers/filterLink'
import { objectMap } from '../helpers/object'
import classNames from 'classnames'

class FilterSection extends React.Component {
  render() {
    let sectionClassName = classNames({
      'filter-section': true,
      'overflow': this.props.children == 'NONE'
    });
    return (
      <div className={sectionClassName}>
        <h3>{ this.props.children != 'NONE' ? this.props.children : '' }</h3>
          {this.props.values.map((item, index) => {
            return (
              <FilterLink key={index} value={item.key} filterKey={this.props.selectedFilter} className="filter-options__option">
                {item.key} ({item.count})
              </FilterLink>
            )
          })}
      </div>
    );
  }
};

FilterSection.propTypes = {
  values: PropTypes.array.isRequired
}

export default FilterSection
