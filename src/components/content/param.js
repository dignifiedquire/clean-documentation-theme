'use strict'

const React = require('react')
const Radium = require('radium')
const {Column, Row} = require('radium-bootstrap-grid')

const Utils = require('../../utils')
const Type = require('./type')

const Param = ({
  name,
  typeVal,
  defaultVal,
  description,
  properties,
  utils
}) => {
  const rendered = {
    __html: utils.md(description, true)
  }

  let propertyList

  if (properties && properties.length > 0) {
    propertyList = properties.map((p) => (
      <Row key={p.name}>
        <Column md={4} ms={4} xs={12}>
          <Type
            name={p.name}
            val={p.type}
            defaultVal={p.default}
            utils={utils} />
        </Column>
        <Column
          md={8}
          ms={8}
          xs={12}
          dangerouslySetInnerHTML={{
            __html: utils.md(p.description, true)
          }} />
      </Row>
    ))
  }

  return (
    <div>
      <Row key='1'>
        <Column md={4} ms={4} xs={12}>
          <Type
            name={name}
            val={typeVal}
            defaultVal={defaultVal}
            utils={utils} />
        </Column>
        <Column
          md={8} ms={8}
          xs={12}
          dangerouslySetInnerHTML={rendered} />
      </Row>
      {propertyList}
    </div>
  )
}

Param.propTypes = {
  name: React.PropTypes.string.isRequired,
  typeVal: React.PropTypes.any,
  defaultVal: React.PropTypes.string,
  description: React.PropTypes.object,
  properties: React.PropTypes.array,
  utils: React.PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Param)
