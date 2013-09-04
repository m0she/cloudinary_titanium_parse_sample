cloudinary = require '/lib/cloudinary'
config = require('config').config

init = (options) ->
  view = $.getView()
  delete options.collection
  Ti.API.info "Creating grid_child: #{JSON.stringify options} #{view} #{options.image}"

  view.right = view.bottom = options.space if options.space
  view.padding = options.padding if options.padding
  view.height = view.width = options.sideSize if options.sideSize

  if (identifier = options[config.parse_cloudinary_field])
    cloudinary_options = {}
    if options.width > 1 && options.height > 1
      cloudinary_options.width = options.width
      cloudinary_options.height = options.height
      cloudinary_options.crop = "fill"
    url = cloudinary.utils.url_from_identifier identifier, cloudinary_options
    Ti.API.info "Cloudinary url: #{url}"
    view.image = url

  for event in ['error', 'load', 'postlayout', 'click']
    title = options.title
    do (event) -> view.addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data} #{JSON.stringify data}"

init.apply @, arguments
Ti.API.info "Created grid_child"