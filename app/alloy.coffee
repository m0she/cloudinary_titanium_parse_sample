config = require('config').config
require 'ti.parse'
cloudinary = require 'lib/cloudinary'

Parse.initialize config.parse.app_id, config.parse.js_key
cloudinary.config config.cloudinary

Ti.API.info("some url: #{cloudinary.url('hello')}")
