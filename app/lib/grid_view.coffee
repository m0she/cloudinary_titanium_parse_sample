_ = require('alloy/underscore')._

###
  options:
    containerController: 'container_name'
    childController: 'child_name'
    collection: new Backbone.Collection
###
class exports.CollectionView extends Parse.Events
  constructor: (options) ->
    @options = _.extend {}, @defaults, options
    @collection = @options.collection
    @collection.on 'reset', => @render()

    @container = @createContainer()
    lastWidth = 0
    @container.getView().addEventListener 'postlayout', (e) =>
      # Call rendering process when width is updated (both on initial layout
      # and on orientation changes)
      newWidth = @container.getView().size.width
      if lastWidth != newWidth
        @render()
        lastWidth = newWidth

  createContainer: () -> Alloy.createController @options.containerController, @options
  createChild: (params) -> Alloy.createController @options.childController, _.extend {}, @options, params

  render: ->
    Ti.API.debug "Rendering... width: #{@container.getView().size.width}. items: #{@collection.length}"
    @digestOptions @options
    @container.getView().hide()
    @container.clear()
    @collection.each (model) =>
      @container.addChild @createChild(model.toJSON()).getView()
    @container.getView().show()
    Ti.App.fireEvent 'grid_view_render'

  getView: -> @container.getView()

class exports.GridView extends exports.CollectionView
  defaults:
    containerController: 'grid_main'
    space: 5
    columns: 4
    childController: 'grid_child'

  digestOptions: (options) ->
    options.space ?= 0
    if options.columns && (width = @container.getView().size.width) > 0
      options.sideSize = ((width - options.space) / options.columns) - options.space

