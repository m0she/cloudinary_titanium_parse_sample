var GridView, PhotoCollection, PhotoObject, cloudinary, config, grid, init;

require('ti.parse');

cloudinary = require('/lib/cloudinary');

config = require('config').config;

GridView = require('grid_view').GridView;

grid = void 0;

PhotoObject = Parse.Object.extend({
  className: config.parse_model
});

PhotoCollection = Parse.Collection.extend({
  model: PhotoObject,
  initialze: this.query = new Parse.Query(PhotoObject).descending("createdAt")
});

init = function() {
  var collection, event, title, _i, _len, _ref, _results;
  collection = new PhotoCollection;
  grid = new GridView({
    collection: collection
  });
  $.container.add(grid.getView());
  collection.fetch();
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
