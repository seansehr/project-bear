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
        {this.props.options.map(sortBy => {
          return (
            <div key={sortBy.key}>
              {objectMap(sortBy.options, (key, index) => {
                return (
                  <Link key={sortBy.key + '-' + key} order={key} className="sort-list__category" active={false} onClick={() => {this.props.sortClick(sortBy.key)}}>
                    {sortBy.options[key]}
                  </Link>
                );
              })}
            </div>
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
