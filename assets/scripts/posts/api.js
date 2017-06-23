'use strict'

const config = require('../config')
const store = require('../store')

const createPost = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/posts/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getPosts = function () {
  return $.ajax({
    url: config.apiOrigin + '/posts',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePost = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/posts/' + data.post.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePost = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/posts/' + data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost
}
