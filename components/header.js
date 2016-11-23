'use strict'

import React from 'react'
import Radium from 'radium'
import {Container, Row, Column} from 'radium-bootstrap-grid'

class Header extends React.Component {
  render () {
    const style = {
      boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.25)',
      height: '69px',
      width: '100%',
      minWidth: '100%',
      marginLeft: 0,
      marginRight: 0,
      position: 'fixed',
      zIndex: 99,
      background: '#FFFFFF'
    }

    return (
      <div style={style}>
        <Container>
          <Row>
            <Column>
              {this.props.name}<br />
              {this.props.version}
            </Column>
          </Row>
        </Container>
      </div>
    )
  }
}

module.exports = Radium(Header)
