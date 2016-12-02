'use strict'

const React = require('react')
const Radium = require('radium')

const Utils = require('../../utils')
const Signature = require('./signature')
const Description = require('./description')
const Example = require('./example')
const Params = require('./params')
const SourceLink = require('./source-link')

const SectionMember = ({
  namespace,
  name,
  description,
  member,
  parent,
  utils
}) => {
  return (
    <div>
      <h3 >
        <a className='anchor' name={namespace} />
        {parent}.{name}
        <SourceLink context={member.context} />
      </h3>
      <Signature member={member} utils={utils} />
      <Description content={description} utils={utils} />
      {member.params ? (
        <Params params={member.params} utils={utils} />
      ) : null}
      {member.examples && member.examples.map((example, i) => (
        <Example
          key={i}
          name={example.caption}
          content={example.description}
          utils={utils} />
       ))}
    </div>
  )
}

SectionMember.propTypes = {
  namespace: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  member: React.PropTypes.object,
  parent: React.PropTypes.string.isRequired,
  utils: React.PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(SectionMember)
