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

module.exports = function (comments, options) {
  return new Promise((resolve) => {
    options.project = options['project-homepage']

    // push assets into the pipeline as well.
    vfs.src([path.join(__dirname, '/assets/**')], { base: __dirname }).pipe(
      concat((files) => {
        resolve(files.concat(new File({
          path: 'index.html',
          contents: Buffer.from(pageTemplate({
            docs: comments,
            options: options
          }), 'utf8')
        })))
      }))
  })
}
