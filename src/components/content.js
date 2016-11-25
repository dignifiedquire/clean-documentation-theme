'use strict'

const React = require('react')
const Radium = require('radium')
const {Style} = Radium
const createUtils = require('../utils')
const {sansSerifFont, monoFont, lineHeight, textColor} = require('./styles')

const contentStyles = {
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: sansSerifFont,
    fontWeight: 'bold'
  },
  a: {
    textDecoration: 'none',
    color: '#00AAFF'
  },
  'pre > code': {
    display: 'block',
    padding: '12px 15px 12px 15px',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    position: 'relative',
    overflowX: 'auto',
    fontSize: '13px',
    color: textColor,
    whiteSpace: 'pre'
  },
  code: {
    fontFamily: monoFont,
    display: 'inline',
    fontSize: '13px',
    fontWeight: '400',
    margin: '0 2px',
    padding: '1px 6px',
    boxShadow: '0 0 0 1px #DDD',
    whiteSpace: 'nowrap'
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
          dangerouslySetInnerHTML={rendered} />
      </pre>
    </div>
  )
})

const Type = ({name, val, defaultVal, utils}) => {
  let sig = `${name}: ${utils.formatType(val)}`
  if (defaultVal) {
    sig += ` (=${defaultVal})`
  }

  return (
    <code dangerouslySetInnerHTML={{__html: sig}} />
  )
}

const Param = Radium(({
  name,
  typeVal,
  defaultVal,
  description,
  properties,
  utils
}) => {
  const rendered = {
    __html: utils.md(description, true)
  }

  let propertyList

  if (properties && properties.length > 0) {
    propertyList = properties.map((p) => (
      <tr>
        <td>
          <Type
            name={p.name}
            val={p.type}
            defaultVal={p.default}
            utils={utils} />
        </td>
        <td dangerouslySetInnerHTML={{
          __html: utils.md(p.description, true)
        }} />
      </tr>
    ))
  }

  return (
    <div>
      <tr>
        <td>
          <Type
            name={name}
            val={typeVal}
            defaultVal={defaultVal}
            utils={utils} />
        </td>
        <td
          dangerouslySetInnerHTML={rendered} />
      </tr>
      {propertyList}
    </div>
  )
})

const Params = Radium(({params, utils}) => {
  const thStyle = {
    textAlign: 'left',
    fontFamily: sansSerifFont
  }

  return (
    <div>
      <h4>Parameters</h4>
      <table>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <Param
              name={param.name}
              typeVal={param.type}
              defaultVal={param.default}
              description={param.description}
              properties={param.properties}
              utils={utils} />
           ))}
        </tbody>
      </table>
    </div>
  )
})

const SectionMember = Radium(({namespace, name, description, member, parent, utils}) => {
  return (
    <div>
      <h3>{parent}.{name}</h3>
      <Signature member={member} utils={utils} />
      <Description content={description} utils={utils} />
      {member.params ? (
        <Params params={member.params} utils={utils} />
      ) : null}
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
