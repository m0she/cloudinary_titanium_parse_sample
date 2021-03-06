var init;

init = function(options) {
  var transformation, url;
  transformation = _.extend({
    format: "png"
  }, options.transformation);
  url = cloudinary.utils.url_from_identifier(options.identifier, transformation);
  Ti.API.debug("Tab create " + (JSON.stringify(options)) + " - url: " + url);
  $.image.image = url;
  return $.label.text = options.name;
};

init.apply(this, arguments);
