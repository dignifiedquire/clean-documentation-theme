'use strict'

import React from 'react'
import Radium, {StyleRoot} from 'radium'
import {Container, Column, Row} from 'radium-bootstrap-grid'

import Header from './header'

class App extends React.Component {
  render () {
    const options = this.props.options

    return (
      <StyleRoot>
        <Container>
          <Row>
            <Header name={options.name} version={options.version} />
            <Column>
              <p>
                Hello world 2
              </p>
            </Column>
          </Row>
        </Container>
      </StyleRoot>
    )
  }
}

module.exports = Radium(App)
