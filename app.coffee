axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
contentful   = require 'roots-contentful'
marked       = require 'marked'

module.exports =
  ignores: [
    'README.md',
    '**/layout.*',
    '**/_*',
    '.gitignore',
    'ship.*conf'
  ]

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    contentful(
      access_token: process.env.ACCESS_KEY
      space_id: 'lcngqe23n7gl'
      content_types:
        posts:
          id: '2wKn6yEnZewu2SCCkus4as'
          template: 'views/_post.jade'
          # filters: { 'fields.environment[in]': ['staging', 'production'] }
          path: (e) -> "posts/#{e.slug}"
          write: 'posts.json'
          # sort: compareFunction
          # transform: transformFunction
        events:
          id: 'events'
          template: 'views/_event.jade'
          path: (e) -> "events/#{e.slug}"
          write: 'events.json'
    ),
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true

  locals:
    marked: marked
