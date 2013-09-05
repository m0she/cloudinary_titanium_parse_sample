require 'ti.parse'
config = require('config').config

exports.PhotoObject = Parse.Object.extend
  className: config.parse_model

exports.PhotoCollection = Parse.Collection.extend
  model: exports.PhotoObject
  initialze:
    @query = new Parse.Query(exports.PhotoObject).descending "createdAt"


