var _ = require('lodash');
var requireAll = require('require-all');
var h = require('react-hyperscript');
var ReactDOMServer = require('react-dom/server');
var fs = require('fs-extra');
var less = require('less');
var webpack = require('webpack');
var contentful = require('contentful');

var DIST_DIR = `${__dirname}/dist`;

var rawHtml = fs.readFileSync('./src/templates/index.html', 'utf8');
var rawLess = fs.readFileSync('./src/styles/index.less', 'utf8');

var pages = requireAll({ dirname: __dirname + '/src/pages' });

var client = contentful.createClient({
  space: 'lcngqe23n7gl',
  accessToken: process.env.ACCESS_TOKEN
});

client.getContentType('2wKn6yEnZewu2SCCkus4as') // Post
  .then(posts => console.log(posts.items))
  .catch(e => console.error(e))

less.render(rawLess, { compress: true }).then((output) => {
  _.forEach(pages, (pageDefinition, pageName) => {
    var finalHtml = rawHtml
     .replace('{title}', pageDefinition.title)
     .replace('{inlineCss}', output.css)
     .replace('{pageName}', pageName)
     .replace('{content}', ReactDOMServer.renderToString(h(pageDefinition.component)));

    webpack({
      entry: `./src/pages/${pageName}.js`,
      output: {
        path: DIST_DIR,
        filename: `${pageName}.js`
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }, function(err /* stats */) {
      if (err) {
        console.error(err);
        return err;
      }

      fs.outputFile(`${DIST_DIR}/${pageName}.html`, finalHtml)

      console.log(`Wrote ${pageName} html and js`);
    });

  });
}).catch((e) => {
  console.error(e);
});

