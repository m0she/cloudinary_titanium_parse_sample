var init, transformations;

transformations = [
  ["Original", {}], [
    "Round fill", {
      width: 400,
      height: 700,
      crop: "fill",
      radius: 10
    }
  ], [
    "Scale", {
      width: 400,
      height: 700,
      crop: "scale"
    }
  ], [
    "Fit", {
      width: 400,
      height: 700,
      crop: "fit"
    }
  ], [
    "Thumb + face", {
      width: 400,
      height: 700,
      crop: "thumb",
      gravity: "face"
    }
  ], [
    "Shabang", {
      transformation: [
        {
          width: 400,
          height: 700,
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

init = function(identifier) {
  var event, name_transformation, scrollable, tabs, title, _i, _len, _ref, _results;
  Ti.API.info("Showing photo: " + identifier);
  tabs = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = transformations.length; _i < _len; _i++) {
      name_transformation = transformations[_i];
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

init.apply(this, arguments);
