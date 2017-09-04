'use strict'

const React = require('react')
const Radium = require('radium')
const remark = require('remark')()
const PropTypes = require('prop-types')

const Utils = require('../../utils')

const See = ({tags, utils}) => {
  if (!tags || !tags.length) {
    return null
  }

  const list = tags.filter((tag) => tag.title === 'see')

  if (!list.length) {
    return null
  }

  const wrapperStyle = {
    display: 'inline'
  }

  return (
    <div style={wrapperStyle}>
      <h4>See</h4>
      <ul>
        {list.map((link, i) => (
          <li key={i}>
            <div
              dangerouslySetInnerHTML={{
                __html: utils.md(remark.parse(link.description))
              }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

See.propTypes = {
  tags: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(See)
