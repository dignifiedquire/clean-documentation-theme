'use strict'

const React = require('react')
const {Style} = require('radium')

const {sansSerifFont, textColor, lineHeight} = require('./styles')

const bodyStyle = {
  margin: 0,
  padding: 0,
  color: textColor,
  fontFamily: sansSerifFont,
  fontWeight: 300,
  lineHeight: lineHeight(),
  fontSize: '17px'
}

module.exports = ({name, content}) => {
  return (
    <html>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{name} - Documentation</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:300,500,700' rel='stylesheet' />
        <Style scopeSelector='body' rules={bodyStyle} />
      </head>
      <body>
        <main id='app' dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  )
}
