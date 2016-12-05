'use strict'

const React = require('react')
const Radium = require('radium')
const {Container, Column, Row} = require('radium-bootstrap-grid')

const Utils = require('../../utils')
const {sansSerifFont} = require('../styles')
const Param = require('./param')

const Params = ({params, utils}) => {
  if (!params || !params.length) {
    return null
  }

  const thStyle = {
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: sansSerifFont
  }

  return (
    <div>
      <h4>Parameters</h4>
      <Container style={{maxWidth: '100%'}}>
        <Row>
          <Column
            md={4} ms={4}
            xsHidden
            style={thStyle}>
            Name
          </Column>
          <Column
            md={8} ms={8}
            xsHidden
            style={thStyle}>
            Description
          </Column>
        </Row>
        <Row>
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
        </Row>
      </Container>
    </div>
  )
}

Params.propTypes = {
  params: React.PropTypes.array,
  utils: React.PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Params)
