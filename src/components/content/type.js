'use strict'

const React = require('react')
const PropTypes = require('prop-types')

const Utils = require('../../utils')

const Type = ({name, val, defaultVal, utils}) => {
  let sig = `${name}: ${utils.formatType(val)}`
  if (defaultVal) {
    sig += ` (=${defaultVal})`
  }

  return (
    <code dangerouslySetInnerHTML={{__html: sig}} />
  )
}

Type.propTypes = {
  name: PropTypes.string,
  val: PropTypes.any,
  defaultVal: PropTypes.string,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Type
