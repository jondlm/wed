var _ = require('lodash');
var requireAll = require('require-all');
var h = require('react-hyperscript');
var ReactDOMServer = require('react-dom/server');
var fs = require('fs-extra');
var less = require('less');

var rawHtml = fs.readFileSync('./src/templates/index.html', 'utf8');
var rawLess = fs.readFileSync('./src/styles/index.less', 'utf8');

var pages = requireAll({ dirname: __dirname + '/src/pages' });

less.render(rawLess).then((output) => {
  var finalCss = output.css;
  console.log(finalCss);
}).catch((e) => {
  console.error(e);
});

// var html = rawHtml
//   .replace('{title}', index.title)
//   .replace('{content}', ReactDOMServer.renderToStaticMarkup(h(index.component)));
