var h = require('react-hyperscript');
var ReactDOMServer = require('react-dom/server');
var fs = require('fs');

var index = require('./src/Index');

var html = fs.readFileSync('./src/templates/index.html', 'utf8');

html = html.replace('{title}', index.title);
html = html.replace('{content}', ReactDOMServer.renderToStaticMarkup(h(index.component)));

console.log(html);
