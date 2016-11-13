import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { objectMap } from '../../helpers/object'
import Filter from './filter'
import Link from '../../helpers/components/link'

class FilterList extends React.Component {
  render() {
    let filterClassName = classNames({
      'filters': true,
      'opened': this.props.activeCategory
    });
    return (
      <div className={filterClassName}>
        <Link active={false} onClick={this.props.close} className="modal__close"><span className="show-for-sr">close filter dialog</span></Link>
        {this.props.options.map((option, index) => {
          return (
            <Filter key={option.key} values={option.values} filterKey={this.props.activeCategory}>
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
