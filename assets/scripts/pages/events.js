'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store.js')
const api = require('./api')
const ui = require('./ui.js')

const createPageFieldsView = require('../templates/createPageFields.handlebars')
const updatePageFieldsView = require('../templates/updatePageFields.handlebars')

const onGetAllPages = (event) => {
  event.preventDefault()
  api.getAllPages()
    .then(ui.getAllPagesSuccess)
    .catch(ui.getAllPagesFailure)
}

const onLoadAllPages = () => {
  api.getAllVisitorPages()
    .then(ui.getAllVisitorPagesSuccess)
    .catch(ui.getAllVisitorPagesFailure)
}

const onGetAllUserPages = (event) => {
  event.preventDefault()
  api.getAllUserPages()
    .then(ui.getAllUserPagesSuccess)
    .catch(ui.getAllUserPagesFailure)
}

const onGetAllPagesChain = () => {
  api.getAllVisitorPages()
    .then(ui.getAllPagesSuccess)
    .catch(ui.getAllPagesFailure)
}

const onNewUserPage = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.newUserPage(data)
    .then(ui.newUserPageSuccess)
    .then(() => {
      api.getAllUserPages(store.pages[0]._owner)
        .then(ui.getAllUserPagesSuccess)
        .catch(ui.getAllUserPagesFailure)
    })
    .catch(ui.newUserPageFailure)
}

const onUpdatePage = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateUserPage(data)
    .then(ui.updatePageSuccess)
    .catch(ui.updatePageFailure)
}

const onShowCreatePageForms = (event) => {
  event.preventDefault()
  const createPageFieldsHTML = createPageFieldsView()
  $('#app').empty()
  $('#app').append(createPageFieldsHTML)
}

const onShowUpdatePageForm = function (event) {
  const data = this.dataset.id
  event.preventDefault()
  const updatePageFieldsHTML = updatePageFieldsView()
  $('#app').empty()
  $('#app').append(updatePageFieldsHTML)
  $('#page-id-input').attr('value', data)
  // $('#edit-post-title-input').val(currentPostId.title)
  // $('#edit-post-content-input').val(currentPostId.content)
}
// GO HOME | GO HOME | GO HOME | GO HOME | GO HOME |
// const onGoHome = (event) => {
//   event.preventDefault()
//   $('#content').empty()
// }

// const onOpenEditMovieFields = () => {
//   event.preventDefault()
//   const editMovieFieldsHTML = editMovieFieldsView()
//   $('#content').empty()
//   $('#content').append(editMovieFieldsHTML)
//   $('.hide-movie-id').hide()
//   // $('#edit-movie-modal').modal('show')
//   const currentMovieId = $(event.target).attr('data-id')
//   $('#edit-movie-id-input').val(currentMovieId)
//   const currentMovieArray = store.movies.filter((movie) => {
//     return String(movie.id) === currentMovieId
//   })

const addHandlers = () => {
  $('#all-pages-button').on('click', onGetAllPages)
  $('#my-pages-button').on('click', onGetAllUserPages)
  $(document).on('submit', '#create-new-page-forms-submit', onNewUserPage)
  $(document).on('click', '.update-page-button', onShowUpdatePageForm)
  $(document).on('submit', '#update-new-page-forms-submit', onUpdatePage)
  // $(document).on('click', '#cancel-create-page-button', onGetAllUserPages)
  $(document).on('click', '#show-create-page-forms', onShowCreatePageForms)
}

module.exports = {
  addHandlers,
  onLoadAllPages,
  onGetAllPages,
  onGetAllPagesChain
}
