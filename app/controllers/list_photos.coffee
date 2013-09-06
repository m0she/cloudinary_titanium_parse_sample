GridView = require('grid_view').GridView
grid = undefined
PhotoCollection = require('parse_photo_album').PhotoCollection

init = ->
  collection = new PhotoCollection
  grid = new GridView
    collection: collection
  $.container.add grid.getView()
  collection.fetch()

  Ti.App.addEventListener 'render', ->
    options = _.extend image_path: '/images/add_new_photo.png', grid.options
    view = Alloy.createController('grid_child', options).getView()
    grid.container.addChild view
    view.on 'click', ->
      upload_photo = Alloy.createController("upload_photo")
      upload_photo.getView().open()
      upload_photo.getView().addEventListener "uploaded_image", ->
        collection.fetch()

  # Debug:
  for event in ['open', 'close']
    title = 'list_photos - '
    do (event) -> $.getView().addEventListener event, (data) -> Ti.API.debug "#{title} #{event}: #{data}"

init()
if Ti.Platform.osname == 'android'
  $.getView().navBarHidden = true
