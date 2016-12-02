'use strict'

const React = require('react')
const Radium = require('radium')

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
      <tr key={p.name}>
        <td>
          <Type
            name={p.name}
            val={p.type}
            defaultVal={p.default}
            utils={utils} />
        </td>
        <td dangerouslySetInnerHTML={{
          __html: utils.md(p.description, true)
        }} />
      </tr>
    ))
  }

  return (
    <div>
      <tr key='1'>
        <td>
          <Type
            name={name}
            val={typeVal}
            defaultVal={defaultVal}
            utils={utils} />
        </td>
        <td
          dangerouslySetInnerHTML={rendered} />
      </tr>
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
