var cloudinary, config, init;

cloudinary = require('/lib/cloudinary');

config = require('config').config;

init = function(options) {
  var cloudinary_options, event, identifier, title, url, view, _i, _len, _ref, _results;
  view = $.getView();
  delete options.collection;
  Ti.API.info("Creating grid_child: " + (JSON.stringify(options)) + " " + view + " " + options.image);
  if (options.space) {
    view.right = view.bottom = options.space;
  }
  if (options.padding) {
    view.padding = options.padding;
  }
  if (options.sideSize) {
    view.height = view.width = options.sideSize;
  }
  if ((identifier = options[config.parse_cloudinary_field])) {
    cloudinary_options = {};
    if (options.width > 1 && options.height > 1) {
      cloudinary_options.width = options.width;
      cloudinary_options.height = options.height;
      cloudinary_options.crop = "fill";
    }
    url = cloudinary.utils.url_from_identifier(identifier, cloudinary_options);
    Ti.API.info("Cloudinary url: " + url);
    view.image = url;
  }
  _ref = ['error', 'load', 'postlayout', 'click'];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    title = options.title;
    _results.push((function(event) {
      return view.addEventListener(event, function(data) {
        return Ti.API.log("" + title + " " + event + ": " + data + " " + (JSON.stringify(data)));
      });
    })(event));
  }
  return _results;
};

init.apply(this, arguments);

Ti.API.info("Created grid_child");