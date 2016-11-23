'use strict'

import React from 'react'
import Radium from 'radium'

import {lineHeight} from '../constants'

class Nav extends React.Component {
  render () {
    const style = {
      borderRadius: '4px',
      border: '1px solid #e6e9ed',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginTop: `${lineHeight * 2}px`,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 'medium',
      fontSize: '18px'
    }

    return (
      <div style={style}>
        <ul style={{listStyle: 'none'}}>
          {this.props.items.map((el) => <li key={el}>{el}</li>)}
        </ul>
      </div>
    )
  }
}

module.exports = Radium(Nav)
