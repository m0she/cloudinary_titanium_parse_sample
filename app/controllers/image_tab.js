var init;

init = function(options) {
  var transformation, url;
  transformation = _.extend({
    format: "png"
  }, options.transformation);
  url = cloudinary.utils.url_from_identifier(options.identifier, transformation);
  Ti.API.info("Tab create " + (JSON.stringify(options)) + " - url: " + url);
  return $.getView().image = url;
};

init.apply(this, arguments);
