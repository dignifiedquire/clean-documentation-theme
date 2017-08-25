'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const GoCode = require('react-icons/lib/go/code')

const SourceLink = ({context}) => {
  if (!context || !context.github) {
    return null
  }

  const style = {
    float: 'right'
  }

  return (
    <a
      href={context.github.url}
      title={context.github.path}
      style={style}>
      <GoCode />
    </a>
  )
}

SourceLink.propTypes = {
  context: PropTypes.object
}

module.exports = Radium(SourceLink)
