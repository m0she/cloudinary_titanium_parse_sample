(function() {
  var loggedIn;

  require('ti.parse');

  loggedIn = function(user) {};

  this.submit = function(e) {
    var query;
    query = new Parse.Query(Parse.User).equalTo("username", $.username.value);
    return query.count({
      success: function(result) {
        var user;
        Ti.API.info('Count: ' + JSON.stringify(result));
        if (result === 0) {
          user = new Parse.User;
          user.set("username", $.username.value);
          user.set("password", $.password.value);
          return user.signUp(null, {
            success: function(user) {
              return Ti.API.info("Signed up: " + JSON.stringify(user));
            },
            error: function(user, error) {
              return Ti.API.info("Error signing up (user: " + (JSON.stringify(user)) + "): " + (JSON.stringify(error)));
            }
          });
        } else {
          Ti.API.info('Already exists');
          return Parse.User.logIn($.username.value, $.password.value, {
            success: function(user) {
              return Ti.API.info("Logged in: " + JSON.stringify(user));
            },
            error: function(user, error) {
              return Ti.API.info("Error logging in (user: " + (JSON.stringify(user)) + "): " + (JSON.stringify(error)));
            }
          });
        }
      },
      error: function(error) {
        return Ti.API.info('Error: ' + error);
      }
    });
  };

}).call(this);
