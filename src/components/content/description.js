'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const {lineHeight} = require('../styles')
const Utils = require('../../utils')

const Description = ({content, utils}) => {
  const rendered = {
    __html: utils.md(content)
  }

  const style = {
    marginTop: lineHeight(0.5),
    marginBottom: lineHeight(0.5)
  }

  return (
    <div
      dangerouslySetInnerHTML={rendered}
      style={style} />
  )
}

Description.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Description)
