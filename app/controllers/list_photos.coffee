require 'ti.parse'
cloudinary = require '/lib/cloudinary'
config = require('config').config
GridView = require('grid_view').GridView
grid = undefined

PhotoObject = Parse.Object.extend
  className: config.parse_model

PhotoCollection = Parse.Collection.extend
  model: PhotoObject
  initialze:
    @query = new Parse.Query(PhotoObject).descending "createdAt"

init = ->
  collection = new PhotoCollection
  grid = new GridView
    collection: collection
  $.container.add grid.getView()
  collection.fetch()

  # Debug:
  for event in ['open', 'close', 'postlayout', 'focus']
    title = 'list_photos - '
    do (event) -> $.getView().addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data}"

init()
Ti.API.info "Loaded"
