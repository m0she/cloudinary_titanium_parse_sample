require 'ti.parse'
cloudinary = require '/lib/cloudinary'
GridView = require('grid_view').GridView
grid = undefined

url = cloudinary.url 'officialchucknorrispage',
  type: 'facebook'
  format: 'png'
  transformation: [
    height: 95
    width: 95
    crop: 'thumb'
    gravity: 'face'
    effect: 'sepia'
    radius: 20
  ,
    angle: 10
  ]

init = ->
  collection = new Parse.Collection
  grid = new GridView
    collection: collection
    url: url
  $.container.add grid.getView()

  setTimeout ->
    collection.reset [
      {title:'sample 1', remote:'http://www.lorempixel.com/700/600/'}
      {title:'sample 2', remote:'http://www.lorempixel.com/900/1200/'}
      {title:'sample 3', remote:'http://www.lorempixel.com/400/300/'}
      {title:'sample 4', remote:'http://www.lorempixel.com/600/600/'}
      {title:'sample 5', remote:'http://www.lorempixel.com/400/300/'}
      {title:'sample 6', remote:'http://www.lorempixel.com/410/300/'}
      {title:'sample 7', remote:'http://www.lorempixel.com/500/300/'}
      {title:'sample 8', remote:'http://www.lorempixel.com/300/300/'}
      {title:'sample 9', remote:'http://www.lorempixel.com/450/320/'}
      {title:'sample 10', url: url}
      {title:'sample 11', url: url}
      {title:'sample 12', url: url}
      {title:'sample 13', url: url}
    ]
    Ti.API.info "Resetted"
  , 3000

init()
Ti.API.info "Loaded"
