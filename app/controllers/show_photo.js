var get_transformations, identifier, lastWidth, render,
  _this = this;

identifier = arguments[0];

get_transformations = function(width, height) {
  return [
    ["Original", {}], [
      "Round fill", {
        width: width,
        height: height,
        crop: "fill",
        radius: 30
      }
    ], [
      "Scale", {
        width: width,
        height: height,
        crop: "scale"
      }
    ], [
      "Fit", {
        width: width,
        height: height,
        crop: "fit"
      }
    ], [
      "Thumb + face", {
        width: width,
        height: height,
        crop: "thumb",
        gravity: "face"
      }
    ], [
      "Shabang", {
        transformation: [
          {
            width: width,
            height: height,
            crop: "fill",
            gravity: "north"
          }, {
            angle: 20
          }, {
            effect: "sepia"
          }
        ]
      }
    ]
  ];
};

render = function() {
  var event, name_transformation, scrollable, size, tabs, title, _i, _len, _ref, _results;
  size = $.getView().size;
  Ti.API.info("Showing photo: " + identifier);
  tabs = (function() {
    var _i, _len, _ref, _results;
    _ref = get_transformations(size.width - 10, size.height - 10);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name_transformation = _ref[_i];
      _results.push(Alloy.createController("image_tab", {
        identifier: identifier,
        name: name_transformation[0],
        transformation: name_transformation[1]
      }).getView());
    }
    return _results;
  })();
  Ti.API.info(" Tabs: " + (JSON.stringify(tabs)));
  scrollable = Ti.UI.createScrollableView({
    views: tabs,
    showPagingControl: true,
    height: Ti.UI.FILL,
    width: Ti.UI.FILL
  });
  while ($.toplevel.children.length > 0) {
    $.toplevel.remove($.toplevel.children[0]);
  }
  $.toplevel.add(scrollable);
  _ref = ['open', 'close', 'postlayout', 'focus'];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    title = identifier;
    _results.push((function(event) {
      return $.getView().addEventListener(event, function(data) {
        return Ti.API.log("" + title + " " + event + ": " + data);
      });
    })(event));
  }
  return _results;
};

lastWidth = 0;

$.getView().addEventListener('postlayout', function(e) {
  var newWidth;
  newWidth = $.getView().size.width;
  if (lastWidth !== newWidth && newWidth > 0) {
    render();
    return lastWidth = newWidth;
  }
});

if (Ti.Platform.osname === 'android') {
  $.getView().navBarHidden = true;
}
