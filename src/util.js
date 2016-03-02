var React = require('react');
var ReactDOM = require('react-dom');

module.exports = {
  mount: function(Component) {
    // Support client side rendering
    if (typeof document === 'object') {
      ReactDOM.render(
        React.createElement(Component),
        document.querySelector('#react-mount') //eslint-ignore
      );
    }
  }
};
