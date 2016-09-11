import React, { PropTypes } from 'react'
import Link from '../../helpers/components/link'
import { objectMap } from '../../helpers/object'
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
              {objectMap(sortBy.options, (dir, index) => {
                return (
                  <Link key={sortBy.key + '-' + dir} order={dir} className="sort-list__category" active={false} onClick={() => {this.props.sortClick(sortBy.key, dir)}}>
                    {sortBy.options[dir]}
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
