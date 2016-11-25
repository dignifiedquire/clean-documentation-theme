'use strict'

const React = require('react')
const Radium = require('radium')
const {Style} = Radium
const createUtils = require('../utils')
const {sansSerifFont, monoFont, lineHeight, textColor} = require('./styles')

const blockCodeStyle = {
  fontFamily: monoFont,
  display: 'block',
  padding: '12px 15px 12px 15px',
  borderRadius: '4px',
  boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
  marginBottom: '30px',
  position: 'relative',
  overflowX: 'auto',
  fontSize: '13px',
  color: textColor
}

const contentStyles = {
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: sansSerifFont,
    fontWeight: 'bold'
  },
  // Highlightjs Theme
  '.hljs-meta': {
    color: '#666'
  },
  '.hljs-comment': {
    color: '#BBB'
  },
  '.hljs-number': {
    color: '#9B80FF'
  },
  '.hljs-string': {
    color: '#75DE00'
  },
  '.hljs-keyword, .hljs-function': {
    color: '#F95FAA'
  },
  '.hljs-symbol, .hljs-class, .hljs-title, .hljs-literal': {
    color: '#EEBA00'
  },
  '.hljs-params': {
    color: '#444'
  },
  '.hljs-built_in': {
    fontWeight: 'bold'
  },
  '.hljs-subst': {
    color: textColor
  }
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

const Description = Radium(({content, utils}) => {
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
})

const Example = Radium(({caption, content, utils}) => {
  let renderedCaption

  if (caption) {
    renderedCaption = (
      <p dangerouslySetInnerHTML={{__html: utils.md(caption)}} />
    )
  }

  const rendered = {
    __html: utils.highlight(content)
  }

  return (
    <div>
      <h4>Example</h4>
      {renderedCaption}
      <pre>
        <code
          style={blockCodeStyle}
          dangerouslySetInnerHTML={rendered} />
      </pre>
    </div>
  )
})

const SectionMember = Radium(({namespace, name, description, member, parent, utils}) => {
  return (
    <div>
      <h3>{parent}.{name}</h3>
      <Signature member={member} utils={utils} />
      <Description content={description} utils={utils} />
      {member.examples && member.examples.map((example) => (
        <Example
          name={example.caption}
          content={example.description}
          utils={utils} />
       ))}
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
  const memberTypes = [
    'static',
    'instance',
    'events'
  ].filter((key) => {
    return members[key] && members[key].length > 0
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
  const utils = createUtils(options, docs)

  return (
    <div>
      <Style rules={contentStyles} />
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
