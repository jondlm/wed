var h = require('react-hyperscript');
var React = require('react');
var Topbar = require('../components/Topbar');
var mount = require('../util').mount;

var Events = React.createClass({
  render() {
    return (
      h('div', [
        h(Topbar)
      ])
    );
  }
});

mount(Events);

// Support server side rendering
module.exports = {
  title: 'Events',
  component: Events
};
