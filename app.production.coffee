axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
marked       = require 'marked'
contentful   = require 'roots-contentful'

module.exports =
  ignores: [
    'README.md',
    '**/layout.*',
    '**/_*',
    '.gitignore',
    'ship.*conf'
  ]

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee', out: 'js/build.js', minify: true, hash: true),
    css_pipeline(files: 'assets/css/*.styl', out: 'css/build.css', minify: true, hash: true)
    contentful(
      preview: true
      access_token: process.env.ACCESS_KEY
      space_id: 'lcngqe23n7gl'
      content_types:
        posts:
          id: '2wKn6yEnZewu2SCCkus4as'
          template: 'views/_post.jade'
          path: (e) -> "posts/#{e.slug}"
          write: 'posts.json'
        events:
          id: 'events'
          template: 'views/_event.jade'
          path: (e) -> "events/#{e.slug}"
          write: 'events.json'
    ),
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]

  locals:
    marked: marked
    url: 'http://jondlm.github.io/wed'
