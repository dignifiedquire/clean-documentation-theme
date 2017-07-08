'use strict'

const React = require('react')
const Radium = require('radium')
const PropTypes = require('prop-types')

const Utils = require('../../utils')
const Signature = require('./signature')
const Description = require('./description')
const Examples = require('./examples')
const Params = require('./params')
const SourceLink = require('./source-link')
const Returns = require('./returns')
const Throws = require('./throws')
const Extends = require('./extends')
const See = require('./see')

const {lineHeight} = require('../styles')

const SectionMember = ({
  namespace,
  name,
  description,
  member,
  parent,
  utils
}) => {
  let displayParent

  if (parent) {
    displayParent = parent + '.'
  }

  let displayName = displayParent + name
  if (name === 'constructor') {
    displayName = name
  }

  const style = {
    marginBottom: lineHeight(2)
  }

  return (
    <div style={style}>
      <h3 >
        <a className='anchor' name={utils.slug(namespace)} />
        {displayName}
        <SourceLink context={member.context} />
      </h3>
      <Signature member={member} utils={utils} />
      <Description content={description} utils={utils} />
      <Extends list={member.augments} utils={utils} />
      <Params params={member.params} utils={utils} />
      <Returns list={member.returns} utils={utils} />
      <Throws list={member.throws} utils={utils} />
      <Examples list={member.examples} utils={utils} />
      <See tags={member.tags} utils={utils} />
    </div>
  )
}

SectionMember.propTypes = {
  namespace: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  member: PropTypes.object,
  parent: PropTypes.string.isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(SectionMember)
