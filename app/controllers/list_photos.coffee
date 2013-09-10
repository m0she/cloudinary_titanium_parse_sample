GridView = require('grid_view').GridView
grid = undefined
PhotoCollection = require('parse_photo_album').PhotoCollection

add_upload_button = () ->
  options = _.extend image_path: '/images/add_new_photo.png', type: 'add_photo', grid.options
  child = Alloy.createController('grid_child', options)
  grid.container.addChild child.getView()

open_view = (view) ->
  if Ti.Platform.osname == 'iphone' or Ti.Platform.osname == 'ipad'
    $.nav.open view
  else
    view.open()

open_controller = (controller_args...) ->
  open_view Alloy.createController(controller_args...).getView()

upload_photo = ->
  open_controller("upload_photo")

show_photo = (identifier) ->
  open_controller("show_photo", identifier)

init = ->
  collection = new PhotoCollection
  grid = new GridView
    collection: collection
  $.container.add grid.getView()
  collection.fetch()

  Ti.App.addEventListener 'grid_view_render', ->
    return add_upload_button()

  Ti.App.addEventListener 'child_clicked', (e) ->
    return upload_photo() if e.data.type == 'add_photo'
    return show_photo(e.identifier) if e.identifier

  Ti.App.addEventListener 'uploaded_image', ->
    # Image added - Refresh collection
    collection.fetch()

init()
if Ti.Platform.osname == 'android'
  # Use Android back button - no need for navigation bar
  $.getView().navBarHidden = true
