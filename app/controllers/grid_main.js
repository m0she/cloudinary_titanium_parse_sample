var defaults, init;

this.clear = function() {
  return $.gridScrollView.removeAllChildren();
};

this.addChild = function(child) {
  return $.gridScrollView.add(child);
};

defaults = {
  space: 5
};

init = function(options) {
  options = _.extend({}, defaults, options);
  $.gridScrollView.left = options.space;
  $.gridScrollView.top = options.space;
  $.gridScrollView.right = -1;
  if (options.frameColor) {
    return $.gridMain.backgroundColor = options.frameColor;
  }
};

init.apply(this, arguments);
