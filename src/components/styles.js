'use strict'

exports.lineHeight = (n = 1) => `${n * 23}px`

exports.monoFont = 'Roboto Mono, Menlo, Monaco, Courier, monospace'
exports.serifFont = 'Roboto Slab, serif'
exports.sansSerifFont = 'Roboto, sans-serif'

exports.textColor = '#5b6888'
exports.lightGray = '#e6e9ed'

exports.contentStyles = {
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: exports.sansSerifFont,
    fontWeight: 'bold'
  },
  h1: {
    fontSize: '32px',
    lineHeight: '42px'
  },
  h2: {
    fontSize: '21px',
    lineHeight: '27px'
  },
  h3: {
    fontSize: '17px',
    lineHeight: '22px'
  },
  a: {
    textDecoration: 'none',
    color: '#00AAFF',
    ':hover': {
      cursor: 'pointer'
    }
  },
  'a.anchor:before': {
    content: '""',
    display: 'block',
    height: '100px',
    margin: '-80px 0 0'
  },
  'pre.hljs, pre > code': {
    fontFamily: exports.monoFont,
    display: 'block',
    padding: '12px 15px 12px 15px',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    position: 'relative',
    overflowX: 'auto',
    fontSize: '13px',
    color: exports.textColor,
    whiteSpace: 'pre'
  },
  code: {
    fontFamily: exports.monoFont,
    display: 'inline',
    fontSize: '13px',
    fontWeight: '400',
    margin: '0 2px',
    padding: '1px 6px',
    boxShadow: '0 0 0 1px #DDD',
    whiteSpace: 'nowrap'
  },
  // Highlightjs Theme
  '.hljs-meta': {
    color: '#666'
  },
  '.hljs-comment': {
    color: '#BBB'
  },
  '.hljs-number': {
    color: '#9B80FF'
  },
  '.hljs-string': {
    color: '#75DE00'
  },
  '.hljs-keyword, .hljs-function': {
    color: '#F95FAA'
  },
  '.hljs-symbol, .hljs-class, .hljs-title, .hljs-literal': {
    color: '#EEBA00'
  },
  '.hljs-params': {
    color: '#444'
  },
  '.hljs-built_in': {
    fontWeight: 'bold'
  },
  '.hljs-subst': {
    color: exports.textColor
  }
}
