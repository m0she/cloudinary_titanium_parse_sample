var defaults, init;

this.clear = function() {
  return $.gridScrollView.removeAllChildren();
};

this.addChild = function(child) {
  Ti.API.info("grid_main - adding child " + child + " " + $.gridScrollView.children.length);
  $.gridScrollView.add(child);
  return Ti.API.info("grid_main - added child " + child + " " + $.gridScrollView.children.length);
};

defaults = {
  space: 5
};

init = function(options) {
  Ti.API.info("Creating grid_main: " + (JSON.stringify(options)));
  options = _.extend({}, defaults, options);
  $.gridScrollView.left = options.space;
  $.gridScrollView.top = options.space;
  $.gridScrollView.right = -1;
  if (options.frameColor) {
    return $.gridMain.backgroundColor = options.frameColor;
  }
};

init.apply(this, arguments);
