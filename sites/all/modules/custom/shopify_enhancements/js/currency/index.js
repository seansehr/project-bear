var connect = require('react-redux').connect;
var Price = require('./price.js');

var setCurrency = function(currency) {
  return {
    type: 'SET_CURRENCY',
    currency: currency
  }
}

var mapStateToProps = function(state, ownProps) {
  console.log('mapStateToProps');
  return {
    currency: ownProps.currency
  };
};

var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onClick: function onClick() {
      dispatch(setCurrency(ownProps.currency));
    }
  };
};

var Currency = connect(mapStateToProps, mapDispatchToProps)(Price);

module.exports = Currency;
