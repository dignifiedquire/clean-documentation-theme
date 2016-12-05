'use strict'

const path = require('path')
const File = require('vinyl')
const vfs = require('vinyl-fs')
const concat = require('concat-stream')
const render = require('react-dom/server').renderToStaticMarkup
const React = require('react')

const Html = React.createFactory(require('./components/html.js'))
const App = React.createFactory(require('./components/app.js'))

function pageTemplate (props) {
  const content = render(new App(props))
  const markup = new Html({
    name: props.options.name,
    content: content
  })

  const html = render(markup)

  return `<!doctype html>\n${html}`
}

function getProject (comments) {
  if (!comments || !comments.length) {
    return
  }

  if (!comments[0].context) {
    return
  }

  const url = comments[0].context.github

  // url is of the form
  // https://github.com/libp2p/js-peer-id/blob/c1ed9751e34fabd3c7687cb6f8850aa68f63581f/src/index.js#L24-L141
  return url.split('/').slice(0, 5).join('/')
}

module.exports = function (comments, options, callback) {
  options.project = getProject(comments)

  // push assets into the pipeline as well.
  vfs.src(
    [path.join(__dirname, '/assets/**')], { base: __dirname }
  )
    .pipe(concat(function (files) {
      callback(null, files.concat(new File({
        path: 'index.html',
        contents: new Buffer(pageTemplate({
          docs: comments,
          options: options
        }), 'utf8')
      })))
    }))
}
