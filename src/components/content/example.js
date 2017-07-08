'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Utils = require('../../utils')

const Example = ({caption, content, utils}) => {
  let renderedCaption

  if (caption) {
    renderedCaption = (
      <p dangerouslySetInnerHTML={{__html: utils.md(caption)}} />
    )
  }

  const rendered = {
    __html: utils.highlight(content)
  }

  return (
    <div>
      <h4>Example</h4>
      {renderedCaption}
      <pre>
        <code
          dangerouslySetInnerHTML={rendered} />
      </pre>
    </div>
  )
}

Example.propTypes = {
  caption: PropTypes.object,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Example)
