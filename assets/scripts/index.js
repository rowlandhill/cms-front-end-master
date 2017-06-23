'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./authorization/events.js')

const pageEvents = require('./pages/events.js')
const postEvents = require('./posts/events.js')

$('.signed-in-view').hide()
$('.signed-out-view').show()

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  pageEvents.onLoadAllPages()
  pageEvents.addHandlers()
  postEvents.addHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
