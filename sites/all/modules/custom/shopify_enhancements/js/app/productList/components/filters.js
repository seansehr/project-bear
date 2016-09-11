import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { objectMap } from '../../helpers/object'
import Filter from './filter'

class FilterList extends React.Component {
  render() {
    let filterClassName = classNames({
      'filters': true,
      'opened': this.props.selectedFilter
    });
    return (
      <div className={filterClassName}>
        {this.props.options.map((option, index) => {
          return (
            <Filter key={option.key} values={option.values} selectedFilter={this.props.selectedFilter}>
              {option.key}
            </Filter>
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