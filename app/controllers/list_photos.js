var GridView, PhotoCollection, grid, init, open_controller, open_view, show_photo, upload_photo,
  __slice = [].slice;

GridView = require('grid_view').GridView;

grid = void 0;

PhotoCollection = require('parse_photo_album').PhotoCollection;

open_view = function(view) {
  if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
    return $.nav.open(view);
  } else {
    return view.open();
  }
};

open_controller = function() {
  var controller_args;
  controller_args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return open_view(Alloy.createController.apply(Alloy, controller_args).getView());
};

upload_photo = function() {
  return open_controller("upload_photo");
};

show_photo = function(identifier) {
  return open_controller("show_photo", identifier);
};

init = function() {
  var collection, event, title, _i, _len, _ref, _results;
  collection = new PhotoCollection;
  grid = new GridView({
    collection: collection
  });
  $.container.add(grid.getView());
  collection.fetch();
  Ti.App.addEventListener('render', function() {
    var child, options;
    options = _.extend({
      image_path: '/images/add_new_photo.png',
      type: 'add_photo'
    }, grid.options);
    child = Alloy.createController('grid_child', options);
    return grid.container.addChild(child.getView());
  });
  Ti.App.addEventListener('child_clicked', function(e) {
    if (e.data.type === 'add_photo') {
      return upload_photo();
    }
    if (e.identifier) {
      return show_photo(e.identifier);
    }
  });
  Ti.App.addEventListener('uploaded_image', function() {
    return collection.fetch();
  });
  _ref = ['open', 'close'];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    title = 'list_photos - ';
    _results.push((function(event) {
      return $.getView().addEventListener(event, function(data) {
        return Ti.API.debug("" + title + " " + event + ": " + data);
      });
    })(event));
  }
  return _results;
};

init();

if (Ti.Platform.osname === 'android') {
  $.getView().navBarHidden = true;
}
