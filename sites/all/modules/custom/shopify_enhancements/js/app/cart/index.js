// index.js
var React = require('react');
var ReactDOM = require('react-dom');

var Cart = React.createClass({
  getInitialState: function() {
    return {
      'items': []
    };
  },

  componentDidMount: function() {
    // Using YQL and JSONP
    this.serverRequest = jQuery.ajax({
      url: "http://" + Drupal.settings.shopify_enhancements.domain + "/cart.json",

      // The name of the callback parameter, as specified by the YQL service
      jsonp: "callback",

      // Tell jQuery we're expecting JSONP
      dataType: "jsonp",

      // Work with the response
      success: function( response ) {
        console.log( response ); // server response
        this.setState(response);
      }.bind(this),

      error: function (response, test1, test2) {
        console.log(response);
        console.log(test1);
        console.log(test2);
      }
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.items.length}
        <ul>
          {this.state.items.map(function (item) {
            return <CartItem key={item.id} data={item}/>;
          })}
        </ul>
      </div>
    );
  }
});

var CartItem = React.createClass({
  render: function() {
    return (
      <li>
        {this.props.data.title}
      </li>
    );
  }
});

ReactDOM.render(
  <Cart />,
  document.getElementById('cart')
);
