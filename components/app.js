'use strict'

import React from 'react'
import Radium, {StyleRoot} from 'radium'
import {Container, Column, Row} from 'radium-bootstrap-grid'

import Header from './header'
import utils from '../utils'

const lineHeight = 23

class App extends React.Component {
  render () {
    const options = this.props.options
    const docs = this.props.docs
    const contentStyle = {
      marginTop: `${lineHeight * 4}px`
    }
    const md = utils(this.props.options, this.props.docs).md
    return (
      <StyleRoot>
        <Header name={options.name} version={options.version} />

        <Container>
          <Row>
            <Column style={contentStyle}>
              <ul>
                {docs.map((el) => {
                   return (
                     <li>
                       {el.name}<br />
                       <div
                         dangerouslySetInnerHTML={{
                           __html: md(el.description)
                        }} />
                     </li>
                   )
                })}
              </ul>
            </Column>
          </Row>
        </Container>
      </StyleRoot>
    )
  }
}

module.exports = Radium(App)
