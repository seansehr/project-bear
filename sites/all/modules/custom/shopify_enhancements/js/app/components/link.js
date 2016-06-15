import React, { PropTypes } from 'react'
import classNames from 'classnames'

class Link extends React.Component {
  render() {
    let linkClassNames = classNames({
      'active': this.props.active,
      [this.props.className]: true
    });
    return (
      <a href="#" className={linkClassNames} onClick={(e) => {
           e.preventDefault()
           this.props.onClick(this.props.active)
         }}>
        {this.props.children}
      </a>
    )
  }
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
