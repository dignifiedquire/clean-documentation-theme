'use strict'

const React = require('react')
const Radium = require('radium')
const {Style} = Radium
const createUtils = require('../utils')
const {sansSerifFont, monoFont} = require('./styles')

const blockCodeStyle = {
  fontFamily: monoFont,
  display: 'block',
  padding: '12px 15px 12px 15px',
  borderRadius: '4px',
  boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
  marginBottom: '30px',
  position: 'relative',
  overflowX: 'auto',
  fontSize: '13px'
}

const Signature = Radium(({member, utils}) => {
  const content = {
    __html: utils.signature(member)
  }

  return (
    <pre>
      <code
        style={blockCodeStyle}
        dangerouslySetInnerHTML={content} />
    </pre>
  )
})

const SectionMember = Radium(({namespace, name, description, member, parent, utils}) => {
  return (
    <div>
      <h3>{parent}.{name}</h3>
      <Signature member={member} utils={utils} />
      <div
        dangerouslySetInnerHTML={{
          __html: utils.md(description)
        }} />
    </div>
  )
})

const SectionGroup = Radium(({name, utils, members, parent}) => {
  return (
    <div>
      <h4>{name}</h4>
      {members.map((m) => (
        <SectionMember
          key={m.name}
          name={m.name}
          description={m.description}
          parent={parent}
          member={m}
          utils={utils} />
       ))}
    </div>
  )
})

const Section = Radium(({name, namespace, description, section, utils}) => {
  const members = section.members
  const memberTypes = Object.keys(members).filter((key) => {
    return members[key].length > 0
  })

  return (
    <div>
      <h2>{name}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: utils.md(description)
        }} />
      {memberTypes.map((type) => (
        <SectionGroup
          name={type}
          utils={utils}
          parent={name}
          members={members[type]} />
       ))}
    </div>
  )
})

const Content = ({options, docs}) => {
  const hStyle = {
    fontFamily: sansSerifFont,
    fontWeight: 'bold'
  }

  const utils = createUtils(options, docs)

  return (
    <div>
      <Style
        scopeSelector='h1, h2, h3, h4, h5, h6'
        rules={hStyle} />
      {docs.map((section) => (
        <Section
          key={section.name}
          name={section.name}
          namespace={section.namespace}
          section={section}
          description={section.description}
          utils={utils} />
       ))}
    </div>
  )
}

module.exports = Radium(Content)
