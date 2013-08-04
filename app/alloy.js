var cloudinary, config;

config = require('config').config;

require('/ti.parse');

cloudinary = require('/lib/cloudinary');

Parse.initialize(config.parse.app_id, config.parse.js_key);

cloudinary.config(config.cloudinary);
