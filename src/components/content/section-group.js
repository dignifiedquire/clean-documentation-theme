'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Utils = require('../../utils')
const SectionMember = require('./section-member')

const SectionGroup = ({name, utils, members, parent}) => {
  const style = {
    textTransform: 'uppercase'
  }

  let displayParent
  if (name === 'static') {
    displayParent = parent
  } else if (name === 'instance') {
    displayParent = parent + '.prototype'
  }

  return (
    <div>
      <h2 style={style}>{name}</h2>
      {members.map((m, i) => (
        <SectionMember
          key={i}
          name={m.name}
          namespace={m.namespace}
          description={m.description}
          parent={displayParent}
          member={m}
          utils={utils} />
      ))}
    </div>
  )
}

SectionGroup.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  parent: PropTypes.string.isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(SectionGroup)
