var React = require('react');
var classNames = require('classnames');

var Price = React.createClass({
  render: function() {
    var priceBtnClass = classNames({
      'price__price': true,
      'price--compare': this.props.data.compare_at_price
    });
    return (
      <div>
        <span>{this.props.currency}</span>
        <span className="price__compare_at">{this.props.compare_at_price}</span>
        <span className={priceBtnClass}>{this.props.price}</span>
      </div>
    );
  }
});

module.exports = Price;
