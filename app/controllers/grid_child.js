var cloudinary, config, init;

cloudinary = require('/lib/cloudinary');

config = require('config').config;

init = function(options) {
  var cloudinary_options, identifier, url, view,
    _this = this;
  view = $.getView();
  options = _.clone(options);
  delete options.collection;
  if (options.space) {
    view.right = view.bottom = options.space;
  }
  if (options.padding) {
    view.padding = options.padding;
  }
  if (options.sideSize) {
    view.height = view.width = options.height = options.width = options.sideSize;
  }
  if ((identifier = options[config.parse_cloudinary_field])) {
    cloudinary_options = {};
    if (options.width > 1 && options.height > 1) {
      cloudinary_options.width = parseInt(options.width);
      cloudinary_options.height = parseInt(options.height);
      cloudinary_options.crop = "fill";
    }
    url = cloudinary.utils.url_from_identifier(identifier, cloudinary_options);
    view.image = url;
    return view.addEventListener('click', function() {
      return Alloy.createController("show_photo", identifier).getView().open();
    });
  } else if (options.image_path) {
    return view.image = options.image_path;
  }
};

init.apply(this, arguments);
