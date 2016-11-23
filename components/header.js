'use strict'

import React from 'react'
import Radium from 'radium'
import {Row, Column} from 'radium-bootstrap-grid'

class Header extends React.Component {
  render () {
    const style = {
      boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.25)',
      height: '69px'
    }

    return (
      <Row style={style}>
        <Column>
          {this.props.name}<br />
          {this.props.version}
        </Column>
      </Row>
    )
  }
}

module.exports = Radium(Header)
