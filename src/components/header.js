'use strict'

const React = require('react')
const Radium = require('radium')
const {Container, Row, Column} = require('radium-bootstrap-grid')
const Octocat = require('react-icons/lib/go/mark-github')

const {monoFont, sansSerifFont} = require('./styles')

const Title = Radium(({value}) => {
  const style = {
    textTransform: 'uppercase',
    fontFamily: sansSerifFont
  }

  return (
    <div style={style}>
      {value}
    </div>
  )
})

const Version = Radium(({value}) => {
  const style = {
    fontFamily: monoFont,
    fontWeight: 300
  }

  return (
    <div style={style}>
      {value}
    </div>
  )
})

const Header = ({name, version, project}) => {
  const style = {
    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.25)',
    height: '49px',
    width: '100%',
    minWidth: '100%',
    marginLeft: '-20px',
    marginRight: '-20px',
    position: 'fixed',
    zIndex: 99,
    background: '#FFFFFF',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px'
  }

  let projectLink = null

  const projectLinkStyle = {
    textAlign: 'right',
    float: 'right !important',
    fontSize: '36px'
  }

  if (project) {
    projectLink = (
      <Column style={projectLinkStyle}>
        <a href={project}>
          <Octocat />
        </a>
      </Column>
    )
  }

  return (
    <div style={style}>
      <Container>
        <Row>
          <Column
            md={5}
            xs={6}>
            <Title value={name} />
            <Version value={version} />
          </Column>
          {projectLink}
        </Row>
      </Container>
    </div>
  )
}

module.exports = Radium(Header)
