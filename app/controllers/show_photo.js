var empty_container, get_transformations, identifier, lastWidth, render,
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

empty_container = function() {
  var _results;
  _results = [];
  while ($.toplevel.children.length > 0) {
    _results.push($.toplevel.remove($.toplevel.children[0]));
  }
  return _results;
};

render = function() {
  var name_transformation, scrollable, size, tabs;
  size = $.getView().size;
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
  scrollable = Ti.UI.createScrollableView({
    views: tabs,
    showPagingControl: true,
    height: Ti.UI.FILL,
    width: Ti.UI.FILL
  });
  empty_container();
  return $.toplevel.add(scrollable);
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
