const layout = require('../layout.js')
const api = require('./api.js')

const store = require('../store.js')
// const getFormFields = require('../../../lib/get-form-fields')
// const showPagesTemplate = require('../templates/allPagesView.handlebars')
// const showUserPagesTemplate = require('../templates/userPagesView.handlebars')

const postsApi = require('../posts/api.js')
const postsUi = require('../posts/ui.js')

const userPagesMessage = (message) => {
  $('.user-messages').text(message)
  setTimeout(function () {
    $('.user-messages').show()
  }, 500)
  setTimeout(function () {
    $('.user-messages').hide()
  }, 3000)
}

const updatePageSuccess = (data) => {
  userPagesMessage('Page updated!')
  document.getElementById('update-new-page-forms-submit').reset()
  api.getAllUserPages(data)
    .then(getAllUserPagesSuccess)
    .catch(getAllUserPagesFailure)
  $
}

const updatePageFailure = (error) => {
  userPagesMessage('Failed to update page!')

  console.error(error)
  document.getElementById('update-new-page-forms-submit').reset()
}

const getAllPagesSuccess = (response) => {
  layout.loadPages(response)
  userPagesMessage('Page updated!')

  userPagesMessage('Showing all pages!')
  $(document).on('click', '.view-page-posts-button', onGetPagePosts)
}

const getAllVisitorPagesSuccess = (response) => {
  layout.loadVisitorPages(response)
  $(document).on('click', '.view-visitor-page-posts-button', () => {
    $('#sign-in-modal').modal('show')
    $('.modal-title').text('Sign-In')
  })
}

const getAllVisitorPagesFailure = (error) => {
  userPagesMessage('There was an error finding content')
  console.error(error)
}

const getAllPagesFailure = (error) => {
  userPagesMessage('There was an error finding content')
  console.error(error)
}

const newUserPageSuccess = (response) => {
  userPagesMessage('Created new page')
  // layout.loadPages(response)
  // refreshPagesList()
  // document.getElementById('create-new-page-forms-submit').reset()
}

const newUserPageFailure = (error) => {
  userPagesMessage('Failed to create page')
  console.error(error)
  // document.getElementById('create-new-page-forms-submit').reset()
}

// GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS |
// GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS |
// GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS |
// GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS | GET PAGE POSTS |
const onGetPagePosts = (event) => {
  event.preventDefault()
  const pageId = $(event.target).attr('data-id')
  store.currentPageId = pageId
  postsApi.getPosts()
    .then(postsUi.getPostsSuccess)
    .catch(postsUi.getPostsFailure)
}

const getAllUserPagesSuccess = (data) => {
  store.pages = data.pages
  store.userPages = data.pages.filter((page) => {
    return store.user.id === page._owner
  })
  layout.loadUserPages()
  $('.delete-page-button').on('click', onDeleteUserPage)
  $(document).on('click', '.view-page-posts-button', onGetPagePosts)
  // refreshUserPagesList()
}

const getAllUserPagesFailure = (error) => {
  console.error(error)
}

const onDeleteUserPage = (event) => {
  event.preventDefault()
  const removeUserPage = $(event.target).attr('data-id')
  api.deleteUserPage(removeUserPage)
    .then(deleteUserPageSuccess)
    .catch(deleteUserPageFailure)
    .then(() => {
      api.getAllUserPages()
        .then(getAllUserPagesSuccess)
        .catch(getAllUserPagesFailure)
    })
}

const deleteUserPageSuccess = (response) => {
  userPagesMessage('Page deleted!')
}

const deleteUserPageFailure = (error) => {
  userPagesMessage('Failed to update page')

  console.error('failed ', error)
}

module.exports = {
  getAllPagesSuccess,
  getAllPagesFailure,
  newUserPageSuccess,
  newUserPageFailure,
  getAllUserPagesSuccess,
  getAllUserPagesFailure,
  // refreshUserPagesList,
  getAllVisitorPagesSuccess,
  getAllVisitorPagesFailure,
  onGetPagePosts,
  updatePageSuccess,
  updatePageFailure
}
