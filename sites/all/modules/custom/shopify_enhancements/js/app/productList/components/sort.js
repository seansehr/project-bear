import React, { PropTypes } from 'react'
import Link from '../../helpers/components/link'
import TagFilters from '../containers/tagFilters'
import { objectMap } from '../../helpers/object'
import classNames from 'classnames'

class Sort extends React.Component {
  render() {
    let sortClassName = classNames({
      'product-list__sorts': true,
      'opened': !!this.props.open
    });
    let tagFilterClassName = classNames({
      'product-list__filter--tags': true,
      'empty': !this.props.tagFilters.length
    });
    return (
      <div className={sortClassName}>
        <Link active={false} onClick={this.props.close} className="modal__close"><span className="show-for-sr">close sort dialog</span></Link>
        {this.props.options.map(sortBy => {
          return (
            <div className="sorts__category" key={sortBy.key}>
              {objectMap(sortBy.options, (dir, index) => {
                let sortButtonClassName = classNames({
                  'sorts__button': true,
                  'active': (this.props.sortKey === sortBy.key && this.props.sortOrder === dir)
                });
                return (
                  <Link key={sortBy.key + '-' + dir} order={dir} className={sortButtonClassName} active={false} onClick={() => {this.props.sortClick(sortBy.key, dir)}}>
                    {sortBy.options[dir]}
                  </Link>
                );
              })}
            </div>
          );
        })}
        <div className={tagFilterClassName}><TagFilters /></div>
      </div>
    )
  }
}

Sort.propTypes = {
  options: PropTypes.array.isRequired
}

export default Sort;
