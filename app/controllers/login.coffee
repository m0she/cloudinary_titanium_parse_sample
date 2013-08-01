require('ti.parse')

loggedIn = (user) ->

@submit = (e) ->
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
          error: (user, error) ->
            Ti.API.info "Error signing up (user: #{JSON.stringify user}): #{JSON.stringify error}"
      else
        Ti.API.info 'Already exists'
        Parse.User.logIn $.username.value, $.password.value,
          success: (user) ->
            Ti.API.info "Logged in: " + JSON.stringify user
          error: (user, error) ->
            Ti.API.info "Error logging in (user: #{JSON.stringify user}): #{JSON.stringify error}"

    error: (error) ->
      Ti.API.info 'Error: ' + error

