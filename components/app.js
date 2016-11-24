'use strict'

import React from 'react'
import Radium, {Style, StyleRoot} from 'radium'
import {Container, Column, Row} from 'radium-bootstrap-grid'

import Header from './header'
import utils from '../utils'
import Nav from './navigation'
import {lineHeight, sansSerifFont} from './styles'

const hasMembers = (doc) => {
  const m = doc.members
  return m.static.length > 0 ||
         m.instance.length > 0 ||
         (m.events && m.events.length > 0)
}

class App extends React.Component {
  render () {
    const {options, docs} = this.props
    const containerStyle = {
      paddingTop: lineHeight(4)
    }

    const contentStyle = {
      fontFamily: sansSerifFont,
      fontSize: '26px',
      fontWeight: 'bold'
    }

    const md = utils(options, docs).md
    const navItems = docs.map((doc) => {
      return {
        name: doc.name,
        members: hasMembers(doc) ? doc.members : null
      }
    })

    return (
      <StyleRoot>
        <Header name={options.name} version={options.version} />

        <Container style={containerStyle}>
          <Row>
            <Column sm={3} xsHidden>
              <Nav items={navItems} />
            </Column>
            <Column sm={8}>
              <Style scopeSelector='h2' rules={contentStyle} />
              {docs.map((el) => {
                 return (
                   <div>
                     <h2>{el.name}</h2>
                     <div
                       dangerouslySetInnerHTML={{
                         __html: md(el.description)
                       }} />
                   </div>
                 )
               })}
            </Column>
          </Row>
        </Container>
      </StyleRoot>
    )
  }
}

module.exports = Radium(App)
