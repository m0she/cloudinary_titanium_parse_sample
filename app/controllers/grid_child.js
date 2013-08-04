var init;

init = function(options) {
  var event, title, url, view, _i, _len, _ref, _results;
  view = $.getView();
  Ti.API.info("Creating grid_child: " + (JSON.stringify(options)) + " " + view + " " + options.image);
  if (options.remote) {
    url = cloudinary.url(options.remote, {
      type: 'fetch',
      width: 100,
      height: 100,
      crop: 'fill'
    });
    Ti.API.info("Using remote url: " + options.remote + " - cloudinary url: " + url);
    view.setImage(url);
  } else if (options.url) {
    Ti.API.info("Using given url: " + options.url);
    view.setImage(options.url);
  }
  if (options.space) {
    view.right = view.bottom = options.space;
  }
  if (options.padding) {
    view.padding = options.padding;
  }
  if (options.sideSize) {
    view.height = view.width = options.sideSize;
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
