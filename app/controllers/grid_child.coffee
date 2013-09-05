cloudinary = require '/lib/cloudinary'
config = require('config').config

init = (options) ->
  view = $.getView()
  options = _.clone options
  delete options.collection
  Ti.API.info "Creating grid_child: #{JSON.stringify options} #{view} #{options.image}"

  view.right = view.bottom = options.space if options.space
  view.padding = options.padding if options.padding
  view.height = view.width = options.height = options.width = options.sideSize if options.sideSize

  if (identifier = options[config.parse_cloudinary_field])
    cloudinary_options = {}
    if options.width > 1 && options.height > 1
      cloudinary_options.width = parseInt options.width
      cloudinary_options.height = parseInt options.height
      cloudinary_options.crop = "fill"
    url = cloudinary.utils.url_from_identifier identifier, cloudinary_options
    Ti.API.info "Cloudinary url: #{url}"
    view.image = url
    view.addEventListener 'click', =>
      Alloy.createController("show_photo", identifier).getView().open()
  else if options.image_path
    view.image = options.image_path

  # Debug:
  for event in ['error', 'load', 'postlayout', 'click']
    title = options.title
    do (event) -> view.addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data} #{JSON.stringify data}"

init.apply @, arguments
Ti.API.info "Created grid_child"
