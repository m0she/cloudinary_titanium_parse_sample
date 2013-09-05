identifier = arguments[0]
get_transformations = (width, height) ->
  [
    ["Original", {}],
    ["Round fill", { width: width, height: height, crop: "fill", radius: 30 }],
    ["Scale", { width: width, height: height, crop: "scale" }],
    ["Fit", { width: width, height: height, crop: "fit" }],
    ["Thumb + face", { width: width, height: height, crop: "thumb", gravity: "face" }],
    ["Shabang", transformation: [{
        width: width, height: height, crop: "fill", gravity: "north"
      }, {
        angle: 20
      }, {
        effect: "sepia"
      }
    ]]
  ]

render = ->
  size = $.getView().size

  Ti.API.info "Showing photo: #{identifier}"
  tabs = (Alloy.createController "image_tab",
    identifier: identifier
    name: name_transformation[0]
    transformation: name_transformation[1]
  .getView() for name_transformation in get_transformations(size.width - 10, size.height - 10))
  Ti.API.info " Tabs: #{JSON.stringify tabs}"

  scrollable = Ti.UI.createScrollableView
    views: tabs
    showPagingControl: true
    height: Ti.UI.FILL
    width: Ti.UI.FILL

  while $.toplevel.children.length > 0
    $.toplevel.remove($.toplevel.children[0])
  $.toplevel.add scrollable

  # Debug:
  for event in ['open', 'close', 'postlayout', 'focus']
    title = identifier
    do (event) -> $.getView().addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data}"


lastWidth = 0
$.getView().addEventListener 'postlayout', (e) =>
  newWidth = $.getView().size.width
  if lastWidth != newWidth and newWidth > 0
    render()
    lastWidth = newWidth

if Ti.Platform.osname == 'android'
  $.getView().navBarHidden = true
