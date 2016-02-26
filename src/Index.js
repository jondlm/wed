var h = require('react-hyperscript');
var React = require('react');
var Topbar = require('./components/Topbar');

var Index = React.createClass({
  render() {
    return h('div', [
      h(Topbar)
    ]);
  }
});

module.exports = {
  title: 'Mert',
  component: Index
};
