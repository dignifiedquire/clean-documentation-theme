'use strict'

const React = require('react')
const Radium = require('radium')

const Utils = require('../../utils')
const {sansSerifFont} = require('../styles')
const Param = require('./param')

const Params = ({params, utils}) => {
  if (!params || !params.length) {
    return null
  }

  const thStyle = {
    textAlign: 'left',
    fontFamily: sansSerifFont
  }

  return (
    <div>
      <h4>Parameters</h4>
      <table>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <Param
              key={param.name}
              name={param.name}
              typeVal={param.type}
              defaultVal={param.default}
              description={param.description}
              properties={param.properties}
              utils={utils} />
           ))}
        </tbody>
      </table>
    </div>
  )
}

Params.propTypes = {
  params: React.PropTypes.array,
  utils: React.PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Params)
