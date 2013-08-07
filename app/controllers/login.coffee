require('ti.parse')
cloudinary = require '/lib/cloudinary'

init = ->
  $.poweredby.setImage cloudinary.url 'officialchucknorrispage',
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

loggedIn = (user) ->
  Alloy.createController("list_photos").getView().open()

failed = (error) ->
  Ti.UI.createAlertDialog
    message: error.message || error
    title: 'Error logging in'
    ok: 'Okay'
  .show()
  $.submit.enabled = true

@doSubmit = (e) ->
  $.submit.enabled = false
  Ti.API.info('submit: ' + JSON.stringify $.submit)
  query = new Parse.Query(Parse.User).equalTo "username", $.username.value
  query.count
    success: (result) ->
      Ti.API.info('Count: ' + JSON.stringify result)
      if result == 0
        user = new Parse.User
        user.set "username", $.username.value
        user.set "password", $.password.value
        user.signUp null,
          success: (user) ->
            Ti.API.info "Signed up: " + JSON.stringify user
            loggedIn user
          error: (user, error) ->
            Ti.API.info "Error signing up (user: #{JSON.stringify user}): #{JSON.stringify error}"
            failed error
      else
        Ti.API.info 'Already exists'
        Parse.User.logIn $.username.value, $.password.value,
          success: (user) ->
            Ti.API.info "Logged in: " + JSON.stringify user
            loggedIn user
          error: (user, error) ->
            Ti.API.info "Error logging in (user: #{JSON.stringify user}): #{JSON.stringify error}"
            failed error

    error: (error) ->
      failed error

init()
