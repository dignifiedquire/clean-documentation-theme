'use strict'

const GithubSlugger = require('github-slugger')
const hljs = require('highlight.js')
const util = require('documentation').util
const createFormatters = util.createFormatters
const createLinkerStack = util.createLinkerStack

module.exports = function utils (options, comments) {
  const linkerStack = createLinkerStack(options)
    .namespaceResolver(comments, (namespace) =>{
      const slugger = new GithubSlugger()
      return '#' + slugger.slug(namespace)
    })

  const formatters = createFormatters(linkerStack.link)
  hljs.configure(options.hljs || {})

  return {
    md (ast, inline) {
      if (inline && ast && ast.children.length && ast.children[0].type === 'paragraph') {
        ast = {
          type: 'root',
          children: ast.children[0].children.concat(ast.children.slice(1))
        }
      }
      return formatters.markdown(ast)
    },
    formatType: formatters.type,
    autolink: formatters.autolink,
    highlight (example) {
      if (options.hljs && options.hljs.highlightAuto) {
        return hljs.highlightAuto(example).value
      }
      return hljs.highlight('js', example).value
    }
  }
}
