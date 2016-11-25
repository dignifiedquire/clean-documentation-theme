'use strict'

const GithubSlugger = require('github-slugger')
const hljs = require('highlight.js')
const util = require('documentation').util
const createFormatters = util.createFormatters
const createLinkerStack = util.createLinkerStack

module.exports = function utils (options, comments) {
  const linkerStack = createLinkerStack(options)
    .namespaceResolver(comments, (namespace) => {
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
    highlight (code) {
      if (options.hljs && options.hljs.highlightAuto) {
        return hljs.highlightAuto(code).value
      }
      return hljs.highlight('js', code).value
    },
    signature (section) {
      let returns = ''
      let prefix = ''

      if (section.kind === 'class') {
        prefix = 'new '
      } else if (section.kind !== 'function') {
        const type = getType(section)
        if (type) {
          return `${section.name} : ${formatters.type(type)}`
        }

        return section.name
      }

      if (section.returns) {
        returns = `: ${formatters.type(section.returns[0].type)}`
      }

      return prefix + section.name + formatters.parameters(section) + returns
    }
  }
}

function getType (section) {
  if (!section.tags) {
    return
  }

  const tag = section.tags.find((tag) => tag.title === 'type')
  if (!tag) {
    return
  }

  return tag.type
}
