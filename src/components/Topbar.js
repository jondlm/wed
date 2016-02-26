var h = require('react-hyperscript');
var React = require('react');

var Index = React.createClass({
  render() {
    return (
      h('div.Topbar-header', [
        'header content'
      ])
    );
  }
});

module.exports = Index;
