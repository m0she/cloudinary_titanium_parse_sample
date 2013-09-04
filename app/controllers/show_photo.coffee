transformations = [
  ["Original", {}],
  ["Round fill", { width: 400, height: 700, crop: "fill", radius: 10 }],
  ["Scale", { width: 400, height: 700, crop: "scale" }],
  ["Fit", { width: 400, height: 700, crop: "fit" }],
  ["Thumb + face", { width: 400, height: 700, crop: "thumb", gravity: "face" }],
  ["Shabang", transformation: [{
      width: 400, height: 700, crop: "fill", gravity: "north"
    }, {
      angle: 20
    }, {
      effect: "sepia"
    }
  ]]
]

init = (identifier) ->
  Ti.API.info "Showing photo: #{identifier}"
  tabs = (Alloy.createController "image_tab",
    identifier: identifier
    name: name_transformation[0]
    transformation: name_transformation[1]
  .getView() for name_transformation in transformations)
  Ti.API.info " Tabs: #{JSON.stringify tabs}"

  scrollable = Ti.UI.createScrollableView
    views: tabs
    showPagingControl: true
    height: Ti.UI.FILL
    width: Ti.UI.FILL

  $.toplevel.add scrollable

  # Debug:
  for event in ['open', 'close', 'postlayout', 'focus']
    title = identifier
    do (event) -> $.getView().addEventListener event, (data) -> Ti.API.log "#{title} #{event}: #{data}"

init.apply @, arguments
