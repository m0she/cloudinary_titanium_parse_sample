_ = require('alloy/underscore')._

###
  options:
    containerController: 'container_name'
    childController: 'child_name'
    collection: new Backbone.Collection
###
class exports.CollectionView
  constructor: (options) ->
    @options = _.extend {}, @defaults, options
    @collection = @options.collection
    @collection.on 'reset', => @render()

    @container = @createContainer()
    lastWidth = 0
    @container.getView().addEventListener 'postlayout', (e) =>
      newWidth = @container.getView().size.width
      if lastWidth != newWidth
        @render()
        lastWidth = newWidth

  createContainer: (controller) -> Alloy.createController @options.containerController, @options
  createChild: (params) -> Alloy.createController @options.childController, _.extend {}, @options, params

  render: ->
    Ti.API.info "Rendering... width: #{@container.getView().size.width}"
    @digestOptions @options
    @container.getView().hide()
    @container.clear()
    @collection.each (model) =>
      @container.addChild @createChild(model.toJSON()).getView()
    @container.getView().show()

  getView: -> @container.getView()

  digestOptions: (options) ->
    options.space ?= 0
    if options.columns && (width = @container.getView().size.width) > 0
      options.sideSize = ((width - options.space) / options.columns) - options.space

class exports.GridView extends exports.CollectionView
  defaults:
    containerController: 'grid_main'
    space: 5
    columns: 4
    childController: 'grid_child'
