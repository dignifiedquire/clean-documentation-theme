'use strict'

const React = require('react')
const {PropTypes} = React
const Radium = require('radium')
const {StyleRoot} = Radium
const {Container, Column, Row} = require('radium-bootstrap-grid')

const Header = require('./header')
const Nav = require('./navigation')
const Content = require('./content')
const {lineHeight} = require('./styles')

const hasMembers = (doc) => {
  const m = doc.members
  return m.static.length > 0 ||
         m.instance.length > 0 ||
         (m.events && m.events.length > 0)
}

const App = ({options, docs}) => {
  const containerStyle = {
    paddingTop: lineHeight(4)
  }

  const navItems = docs.map((doc) => {
    return {
      name: doc.name,
      members: hasMembers(doc) ? doc.members : null
    }
  })

  const navStyle = {
    position: 'fixed',
    height: '80%'
  }

  return (
    <StyleRoot>
      <Header name={options.name} version={options.version} />

      <Container style={containerStyle}>
        <Row>
          <Column md={3} sm={3} xsHidden msHidden style={navStyle}>
            <Nav items={navItems} />
          </Column>
          <Column md={8} mdPush={4} sm={8} smPush={4} ms={12} xs={12}>
            <Content options={options} docs={docs} />
          </Column>
        </Row>
      </Container>
    </StyleRoot>
  )
}

App.propTypes = {
  options: PropTypes.object,
  docs: PropTypes.array
}

module.exports = Radium(App)
