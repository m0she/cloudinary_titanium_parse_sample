var GridView, PhotoCollection, grid, init;

GridView = require('grid_view').GridView;

grid = void 0;

PhotoCollection = require('parse_photo_album').PhotoCollection;

init = function() {
  var collection, event, title, _i, _len, _ref, _results;
  collection = new PhotoCollection;
  grid = new GridView({
    collection: collection
  });
  $.container.add(grid.getView());
  collection.fetch();
  Ti.App.addEventListener('render', function() {
    var options, view;
    Ti.API.info("Render event");
    options = _.extend({
      image_path: '/images/add_new_photo.png'
    }, grid.options);
    view = Alloy.createController('grid_child', options).getView();
    grid.container.addChild(view);
    return view.on('click', function() {
      Ti.API.info("Add new clicked");
      return Alloy.createController("upload_photo").getView().open();
    });
  });
  _ref = ['open', 'close', 'postlayout', 'focus'];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    title = 'list_photos - ';
    _results.push((function(event) {
      return $.getView().addEventListener(event, function(data) {
        return Ti.API.log("" + title + " " + event + ": " + data);
      });
    })(event));
  }
  return _results;
};

init();

Ti.API.info("Loaded");
