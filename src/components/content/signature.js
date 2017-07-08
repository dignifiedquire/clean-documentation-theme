'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Utils = require('../../utils')

const Signature = ({member, utils}) => {
  const content = {
    __html: utils.signature(member)
  }

  return (
    <pre>
      <code
        dangerouslySetInnerHTML={content} />
    </pre>
  )
}

Signature.propTypes = {
  member: PropTypes.object,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Signature)
