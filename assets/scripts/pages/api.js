'use strict'

const config = require('../config')
const store = require('../store')

const getAllPages = () => {
  return $.ajax({
    url: config.apiOrigin + '/pages/',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const getAllVisitorPages = () => {
  return $.ajax({
    url: config.apiOrigin + '/pages/',
    method: 'GET'
  })
}

const newUserPage = (data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/pages/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

// THIS NEEDS TO GET A USER ID
const getAllUserPages = (userId) => {
  return $.ajax({
    url: config.apiOrigin + '/pages/',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const getSingleUserPage = (pageId) => {
  return $.ajax({
    url: config.apiOrigin + '/pages/' + pageId,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const deleteUserPage = (pageId) => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/pages/' + pageId,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateUserPage = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/pages/' + data.page.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getAllPages,
  newUserPage,
  getAllUserPages,
  getSingleUserPage,
  deleteUserPage,
  updateUserPage,
  getAllVisitorPages
}
