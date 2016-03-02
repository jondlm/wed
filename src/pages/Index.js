var h = require('react-hyperscript');
var React = require('react');
var Topbar = require('../components/Topbar');
var mount = require('../util').mount;

var Index = React.createClass({
  render() {
    return (
      h('div', [
        h(Topbar)
      ])
    );
  }
});

mount(Index);

// Support server side rendering
module.exports = {
  title: 'Index',
  component: Index
};
