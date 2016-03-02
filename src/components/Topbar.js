var h = require('react-hyperscript');
var React = require('react');

var Index = React.createClass({
  render() {
    return (
      h('div.Topbar', [
        h('header.Topbar-content', [
          'Wed',
        ])
      ])
    );
  }
});

module.exports = Index;
