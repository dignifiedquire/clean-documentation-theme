'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Utils = require('../../utils')

const Extends = ({list, utils}) => {
  if (!list || !list.length) {
    return null
  }

  const wrapperStyle = {
    display: 'inline'
  }

  const supers = {
    __html: list.map((sup) => {
      return utils.autolink(sup.name)
    }).join(', ') + '.'
  }

  return (
    <div style={wrapperStyle}>
      <span> Extends </span>
      <span dangerouslySetInnerHTML={supers} />
    </div>
  )
}

Extends.propTypes = {
  list: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Extends)
