const store = require('./store.js')

const loadPages = (response) => {
  const pageTemplate = require('./templates/allPagesView.handlebars')
  const content = pageTemplate({ pages: response.pages })
  $('#app').empty()
  $('#app').html(content)
}

const loadVisitorPages = (response) => {
  const pageTemplate = require('./templates/allVisitorPagesView.handlebars')
  const content = pageTemplate({ pages: response.pages })
  $('#app').empty()
  $('#app').html(content)
}

const loadUserPages = () => {
  const userPageTemplate = require('./templates/userPagesView.handlebars')
  const content = userPageTemplate({ pages: store.userPages })
  $('#app').empty()
  $('#app').append(content)
}

const loadPagePosts = (response) => {
  const pagePostsTemplate = require('./templates/postsView.handlebars')
  const content = pagePostsTemplate({ posts: store.currentPagePosts })
  $('#app').empty()
  $('#app').html(content)
}

module.exports = {
  loadPages,
  loadPagePosts,
  loadUserPages,
  loadVisitorPages
}
