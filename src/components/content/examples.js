'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Example = require('./example')
const Utils = require('../../utils')

const Examples = ({list, utils}) => {
  if (!list || !list.length) {
    return null
  }

  return (
    <div>
      {list.map((example, i) => (
        <Example
          key={i}
          name={example.caption}
          content={example.description}
          utils={utils} />
      ))}
    </div>
  )
}

Examples.propTypes = {
  list: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Examples)
