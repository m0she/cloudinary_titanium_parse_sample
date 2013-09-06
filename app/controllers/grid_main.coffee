@clear = ->
  $.gridScrollView.removeAllChildren()

@addChild = (child) ->
  $.gridScrollView.add child

defaults =
  space: 5

init = (options) ->
  options = _.extend {}, defaults, options
  $.gridScrollView.left = options.space
  $.gridScrollView.top = options.space
  $.gridScrollView.right = -1
  $.gridMain.backgroundColor = options.frameColor if options.frameColor

init.apply @, arguments
