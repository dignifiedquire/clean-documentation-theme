'use strict'

import React from 'react'
import Radium, {Style, StyleRoot} from 'radium'
import {Container, Column, Row} from 'radium-bootstrap-grid'

import Header from './header'
import utils from '../utils'
import Nav from './navigation'
import {lineHeight} from '../constants'


class App extends React.Component {
  render () {
    const options = this.props.options
    const docs = this.props.docs
    const containerStyle = {
      paddingTop: `${lineHeight * 4}px`
    }
    const contentStyle = {
      fontFamily: 'Robot, sans-serif',
      fontSize: '26px',
      fontWeight: 'bold'
    }

    const md = utils(this.props.options, this.props.docs).md
    return (
      <StyleRoot>
        <Header name={options.name} version={options.version} />

        <Container style={containerStyle}>
          <Row>
            <Column sm={3} xsHidden>
              <Nav items={docs.map((el) => el.name)} />
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
