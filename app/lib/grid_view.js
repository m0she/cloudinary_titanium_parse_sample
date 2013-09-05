var _, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('alloy/underscore')._;

/*
  options:
    containerController: 'container_name'
    childController: 'child_name'
    collection: new Backbone.Collection
*/


exports.CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView(options) {
    var lastWidth,
      _this = this;
    this.options = _.extend({}, this.defaults, options);
    this.collection = this.options.collection;
    this.collection.on('reset', function() {
      return _this.render();
    });
    this.container = this.createContainer();
    lastWidth = 0;
    this.container.getView().addEventListener('postlayout', function(e) {
      var newWidth;
      newWidth = _this.container.getView().size.width;
      if (lastWidth !== newWidth) {
        _this.render();
        return lastWidth = newWidth;
      }
    });
  }

  CollectionView.prototype.createContainer = function() {
    return Alloy.createController(this.options.containerController, this.options);
  };

  CollectionView.prototype.createChild = function(params) {
    return Alloy.createController(this.options.childController, _.extend({}, this.options, params));
  };

  CollectionView.prototype.render = function() {
    var _this = this;
    Ti.API.info("Rendering... width: " + (this.container.getView().size.width));
    this.digestOptions(this.options);
    this.container.getView().hide();
    this.container.clear();
    this.collection.each(function(model) {
      return _this.container.addChild(_this.createChild(model.toJSON()).getView());
    });
    this.container.getView().show();
    return Ti.App.fireEvent('render');
  };

  CollectionView.prototype.getView = function() {
    return this.container.getView();
  };

  CollectionView.prototype.digestOptions = function(options) {
    var width;
    if (options.space == null) {
      options.space = 0;
    }
    if (options.columns && (width = this.container.getView().size.width) > 0) {
      return options.sideSize = ((width - options.space) / options.columns) - options.space;
    }
  };

  return CollectionView;

})(Parse.Events);

exports.GridView = (function(_super) {
  __extends(GridView, _super);

  function GridView() {
    _ref = GridView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GridView.prototype.defaults = {
    containerController: 'grid_main',
    space: 5,
    columns: 4,
    childController: 'grid_child'
  };

  return GridView;

})(exports.CollectionView);
