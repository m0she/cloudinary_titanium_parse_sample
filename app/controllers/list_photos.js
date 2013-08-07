var GridView, PhotoCollection, PhotoObject, cloudinary, config, grid, init, url;

require('ti.parse');

cloudinary = require('/lib/cloudinary');

config = require('config').config;

GridView = require('grid_view').GridView;

grid = void 0;

url = cloudinary.url('officialchucknorrispage', {
  type: 'facebook',
  format: 'png',
  transformation: [
    {
      height: 95,
      width: 95,
      crop: 'thumb',
      gravity: 'face',
      effect: 'sepia',
      radius: 20
    }, {
      angle: 10
    }
  ]
});

PhotoObject = Parse.Object.extend({
  className: config.parse_model
});

PhotoCollection = Parse.Collection.extend({
  model: PhotoObject,
  initialze: this.query = new Parse.Query(PhotoObject).descending("createdAt")
});

init = function() {
  var collection;
  collection = new PhotoCollection;
  grid = new GridView({
    collection: collection,
    url: url
  });
  $.container.add(grid.getView());
  return collection.fetch();
};

init();

Ti.API.info("Loaded");
