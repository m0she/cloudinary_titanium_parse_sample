var cloudinary, failed, init, loggedIn;

require('ti.parse');

cloudinary = require('/lib/cloudinary');

init = function() {
  return $.poweredby.setImage(cloudinary.url('officialchucknorrispage', {
    type: 'facebook',
    format: 'png',
    transformation: [
      {
        height: 95,
        width: 95,
        crop: 'thumb',
        gravity: 'face',
        effect: 'sepia',
        radius: 20
      }, {
        angle: 10
      }
    ]
  }));
};

loggedIn = function(user) {
  return Alloy.createController("list_photos").getView().open();
};

failed = function(error) {
  Ti.UI.createAlertDialog({
    message: error.message || error,
    title: 'Error logging in',
    ok: 'Okay'
  }).show();
  return $.submit.enabled = true;
};

this.doSubmit = function(e) {
  var query;
  $.submit.enabled = false;
  Ti.API.debug('login submit');
  query = new Parse.Query(Parse.User).equalTo("username", $.username.value);
  return query.count({
    success: function(result) {
      var user;
      Ti.API.debug('Count: ' + JSON.stringify(result));
      if (result === 0) {
        user = new Parse.User;
        user.set("username", $.username.value);
        user.set("password", $.password.value);
        return user.signUp(null, {
          success: function(user) {
            Ti.API.debug("Signed up: " + JSON.stringify(user));
            return loggedIn(user);
          },
          error: function(user, error) {
            Ti.API.debug("Error signing up (user: " + (JSON.stringify(user)) + "): " + (JSON.stringify(error)));
            return failed(error);
          }
        });
      } else {
        Ti.API.debug('Already exists');
        return Parse.User.logIn($.username.value, $.password.value, {
          success: function(user) {
            Ti.API.debug("Logged in: " + JSON.stringify(user));
            return loggedIn(user);
          },
          error: function(user, error) {
            Ti.API.debug("Error logging in (user: " + (JSON.stringify(user)) + "): " + (JSON.stringify(error)));
            return failed(error);
          }
        });
      }
    },
    error: function(error) {
      return failed(error);
    }
  });
};

init();
