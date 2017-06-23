'use strict'

const store = require('../store.js')
const layout = require('../layout.js')
const pagesApi = require('../pages/api.js')
const ui = require('../pages/ui.js')
const pagesEvents = require('../pages/events.js')

const userMessage = (message) => {
  $('.user-messages').text(message)
  setTimeout(function () {
    $('.user-messages').show()
  }, 500)
  setTimeout(function () {
    $('.user-messages').hide()
  }, 3000)
}

const signUpSuccess = (data) => {
  $('#sign-up-modal').modal('hide')
  userMessage('Sign up Successful!')
}

const signUpFailure = () => {
  userMessage('Sign up failure!')
  document.getElementById('sign-up').reset()
}

const signInSuccess = (data) => {
  userMessage('You are signed in!')
  store.user = data.user
  $('#get-pages').css({'display': 'block'})
  $('#get-posts').css({'display': 'block'})
  $('.signed-in-view').show()
  $('.signed-out-view').hide()
  $('#sign-in-modal').modal('hide')
  $('#sign-up-modal').modal('hide')
  document.getElementById('sign-up').reset()
  document.getElementById('sign-in').reset()
  pagesApi.getAllPages()
  .then(layout.loadPages(data))
  .then(ui.getAllUserPagesSuccess)

  // $('#get-posts').css({'display': 'block'})
}

const signInFailure = () => {
  $('#sign-in-modal').modal('hide')
  userMessage('Failed to sign in!')
}

const changePasswordSuccess = (response) => {
  userMessage('Password Changed!')
  $('#change-password-modal').modal('hide')
}

const changePasswordFailure = (response) => {
  userMessage('Password Change Failed!')
  $('#change-password-modal').modal('hide')
  document.getElementById('change-password').reset()
}

const signOutSuccess = () => {
  $('.signed-in-view').hide()
  $('.signed-out-view').show()
  document.getElementById('sign-up').reset()
  document.getElementById('sign-in').reset()
  document.getElementById('change-password').reset()
  // layout.loadVisitorPages()
  pagesEvents.onLoadAllPages()
}

const signOutFailure = (error) => {
  document.getElementById('sign-up').reset()
  document.getElementById('sign-in').reset()
  console.error(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  userMessage
}
