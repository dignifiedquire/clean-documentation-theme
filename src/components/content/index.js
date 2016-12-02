'use strict'

const React = require('react')
const Radium = require('radium')
const {Style} = Radium

const Utils = require('../../utils')
const {contentStyles} = require('../styles')

const Section = require('./section')

const Content = ({options, docs}) => {
  const utils = new Utils(options, docs)

  return (
    <div>
      <Style rules={contentStyles} />
      {docs.map((section) => (
        <Section
          key={section.name}
          name={section.name}
          namespace={section.namespace}
          section={section}
          description={section.description}
          utils={utils} />
       ))}
    </div>
  )
}

Content.propTypes = {
  options: React.PropTypes.object.isRequired,
  docs: React.PropTypes.array.isRequired
}

module.exports = Radium(Content)
