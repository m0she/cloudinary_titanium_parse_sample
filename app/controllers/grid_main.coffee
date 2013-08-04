@clear = -> $.gridScrollView.removeAllChildren()
@addChild = (child) ->
  Ti.API.info "grid_main - adding child #{child} #{$.gridScrollView.children.length}"
  $.gridScrollView.add child
  Ti.API.info "grid_main - added child #{child} #{$.gridScrollView.children.length}"

defaults =
  space: 5

init = (options) ->
  Ti.API.info "Creating grid_main: #{JSON.stringify options}"
  options = _.extend {}, defaults, options
  $.gridScrollView.left = options.space
  $.gridScrollView.top = options.space
  $.gridScrollView.right = -1
  $.gridMain.backgroundColor = options.frameColor if options.frameColor

init.apply @, arguments
