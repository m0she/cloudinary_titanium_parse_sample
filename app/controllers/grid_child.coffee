init = (options) ->
  view = $.getView()
  Ti.API.info "Creating grid_child: #{JSON.stringify options} #{view} #{options.image}"

  if options.remote
    url = cloudinary.url options.remote, type: 'fetch', width: 100, height: 100, crop: 'fill'
    Ti.API.info "Using remote url: #{options.remote} - cloudinary url: #{url}"
    view.setImage url
  else if options.url
    Ti.API.info "Using given url: #{options.url}"
    view.setImage options.url

  view.right = view.bottom = options.space if options.space
  view.padding = options.padding if options.padding
  view.height = view.width = options.sideSize if options.sideSize

  for event in ['error', 'load', 'postlayout', 'click']
    title = options.title
    do (event) -> view.addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data} #{JSON.stringify data}"

init.apply @, arguments
Ti.API.info "Created grid_child"
