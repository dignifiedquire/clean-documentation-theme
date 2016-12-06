'use strict'

const React = require('react')
const Radium = require('radium')

const {
  lineHeight,
  sansSerifFont,
  textColor,
  lightGray
} = require('./styles')

const Member = Radium(({name, namespace}) => {
  const linkStyle = {
    fontFamily: sansSerifFont,
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '16px',
    textDecoration: 'none',
    color: '#555'
  }

  return (
    <li>
      <a href={`#${namespace}`} style={linkStyle}>
        {name}
      </a>
    </li>
  )
})

const Members = Radium(({items, name, first}) => {
  const style = {
    paddingTop: first ? 0 : lineHeight(0.5)
  }

  const listStyle = {
    listStyle: 'none',
    paddingLeft: 0
  }

  const nameStyle = {
    textTransform: 'uppercase',
    fontSize: '13px',
    lineHeight: '18px',
    color: '#666'
  }

  return (
    <div style={style}>
      <span style={nameStyle}>{name}</span>
      <ul style={listStyle}>
        {items.map((member, i) => (
          <Member
            key={i}
            name={member.name}
            namespace={member.namespace} />
        ))}
      </ul>
    </div>
  )
})

const Item = Radium(({name, members, last}) => {
  let membersElements = []

  const isFirst = () => membersElements.length === 0

  if (members) {
    let keyCounter = 0
    if (members.static.length > 0) {
      membersElements.push(
        <Members
          key={keyCounter++}
          name='Static'
          items={members.static}
          first={isFirst()} />
      )
    }

    if (members.instance.length > 0) {
      membersElements.push(
        <Members
          key={keyCounter++}
          name='Instance'
          items={members.instance}
          first={isFirst()} />
      )
    }

    if (members.events.length > 0) {
      membersElements.push(
        <Members
          name='Events'
          key={keyCounter++}
          items={members.events}
          first={isFirst()} />
      )
    }
  }

  const style = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: lineHeight(0.5),
    paddingBottom: lineHeight(0.5)
  }

  const itemStyle = {
    borderBottom: (last && !members) ? 'none' : `1px solid ${lightGray}`
  }

  const membersStyle = {
    borderBottom: (last && members) ? 'none' : `1px solid ${lightGray}`

  }
  return (
    <div>
      <li style={[style, itemStyle]}>
        <a style={{color: textColor}} href={`#${name}`}>
          {name}
        </a>
      </li>
      {members ? (
        <li style={[style, membersStyle]}>
          {membersElements}
        </li>
       ) : null}
    </div>
  )
})

const Nav = ({items}) => {
  const style = {
    borderRadius: '4px',
    border: `1px solid ${lightGray}`,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: lineHeight(),
    fontFamily: sansSerifFont,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    maxHeight: '70vh',
    overflowX: 'auto'
  }

  const listStyle = {
    listStyle: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0
  }

  return (
    <div style={style}>
      <ul style={listStyle}>
        {items.map((doc, i) => (
          <Item
            key={i}
            name={doc.name}
            members={doc.members}
            last={i === (items.length - 1)} />
         ))}
      </ul>
    </div>
  )
}

module.exports = Radium(Nav)
