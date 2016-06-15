import React, { PropTypes } from 'react'
import Link from './Link'
import { objectMap } from '../helpers/object'
import classNames from 'classnames'

class Sort extends React.Component {
  render() {
    let sortClassName = classNames({
      'sort-list': true,
      'closed': this.props.open == 'closed'
    });
    return (
      <div className={sortClassName}>
        {this.props.options.map(option => {
          return (
            <Link key={option.key + '-' + option.order} order={option.order} className="filter-list__category" active={false} onClick={() => {this.props.sortClick(option)}}>
              {option.name}
            </Link>
          );
        })}
      </div>
    )
  }
}

Sort.propTypes = {
  options: PropTypes.array.isRequired
}

export default Sort;
