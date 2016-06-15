import React, { PropTypes } from 'react'
import FilterLink from '../containers/filterLink'
import classNames from 'classnames'
import { objectMap } from '../helpers/object'
import FilterSection from './filterSection'

class FilterList extends React.Component {
  render() {
    let filterClassName = classNames({
      'filter-options': true,
      'opened': this.props.selectedFilter
    });
    return (
      <div className={filterClassName}>
        {this.props.options.map((option, index) => {
          return (
            <FilterSection key={option.key} values={option.values} selectedFilter={this.props.selectedFilter}>
              {option.key}
            </FilterSection>
          )
        })}
      </div>
    );
  }
};

FilterList.propTypes = {
  options: PropTypes.array.isRequired
}

export default FilterList
