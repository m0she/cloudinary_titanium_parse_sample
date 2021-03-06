var base_cloudinary_config, cloudinary_config, err, _;

_ = require("../underscore");

cloudinary_config = void 0;

try {
  base_cloudinary_config = require('../cloudinary_config').config;
} catch (_error) {
  err = _error;
  Ti.API.warn("Couldn't find configuration file 'cloudinary_config.js'");
  base_cloudinary_config = {};
}

module.exports = function(new_config, new_value) {
  var cloudinary_url, k, uri, v, _ref;
  if ((cloudinary_config == null) || new_config === true) {
    cloudinary_url = Ti.App.Properties.getString('CLOUDINARY_URL');
    if (cloudinary_url != null) {
      uri = require('url').parse(cloudinary_url);
      cloudinary_config = {
        cloud_name: uri.host,
        api_key: uri.auth && uri.auth.split(":")[0],
        api_secret: uri.auth && uri.auth.split(":")[1],
        private_cdn: uri.pathname != null,
        secure_distribution: uri.pathname && uri.pathname.substring(1)
      };
      if (uri.query != null) {
        _ref = require("querystring").parse(uri.query);
        for (k in _ref) {
          v = _ref[k];
          cloudinary_config[k] = v;
        }
      }
    } else {
      cloudinary_config = _.clone(base_cloudinary_config);
    }
  }
  if (!_.isUndefined(new_value)) {
    cloudinary_config[new_config] = new_value;
  } else if (_.isString(new_config)) {
    return cloudinary_config[new_config];
  } else if (_.isObject(new_config)) {
    cloudinary_config = new_config;
  }
  return cloudinary_config;
};
