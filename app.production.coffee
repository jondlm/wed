axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
contentful   = require 'roots-contentful'
marked       = require 'marked'
_            = require 'lodash'
moment       = require 'moment'

module.exports =
  ignores: [
    'scripts/*',
    'README.md',
    '**/layout.*',
    '**/_*',
    '.gitignore',
    'ship.*conf'
  ]

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee', minify: true),
    css_pipeline(files: 'assets/css/*.styl', out: 'css/build.css', minify: true)
    contentful(
      access_token: process.env.ACCESS_KEY
      space_id: 'lcngqe23n7gl'
      preview: true
      content_types:
        posts:
          id: '2wKn6yEnZewu2SCCkus4as'
          template: 'views/_post.jade'
          path: (e) -> "posts/#{e.slug}"
          write: 'posts.json'
          sort: (a, b) ->
            return a.date > b.date
        events:
          id: 'events'
          template: 'views/_event.jade'
          path: (e) -> "events/#{e.slug}"
          write: 'events.json'
          sort: (a, b) ->
            return a.date > b.date
        regions:
          id: 'region'
          write: 'regions.json'
          sort: (a, b) ->
            return a.name > b.name
        event_types:
          id: 'eventType'
          write: 'event-types.json'
          sort: (a, b) ->
            return a.name > b.name
    ),
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]

  marked:
    gfm: true

  locals:
    _: _
    marked: marked
    moment: moment
    url: 'http://jondlm.github.io/wed'
    cb: Date.now()
