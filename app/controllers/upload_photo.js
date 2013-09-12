var PhotoObject, cloudinary, config, handle_error, pick_image, upload_image;

cloudinary = require('/lib/cloudinary');

config = require('config').config;

PhotoObject = require('parse_photo_album').PhotoObject;

handle_error = function(error) {
  var dialog;
  Ti.API.info("Error: " + (JSON.stringify(error)));
  dialog = Ti.UI.createAlertDialog({
    message: error.message || error,
    title: 'Error uploading image',
    ok: 'Okay'
  });
  dialog.addEventListener('click', function() {
    return $.getView().close();
  });
  return dialog.show();
};

upload_image = function(image) {
  var image_file;
  image_file = image.media.nativePath;
  Ti.API.debug("Signing " + image_file);
  return Parse.Cloud.run(config.parse_sign_cloud_function, {}, {
    success: function(sign_result) {
      Ti.API.debug("Uploading: " + (JSON.stringify(sign_result)));
      return cloudinary.uploader.upload(image_file, function(upload_result) {
        var obj, signed;
        Ti.API.debug("Upload done: " + (JSON.stringify(upload_result)));
        if (upload_result.error) {
          return handle_error(upload_result.error);
        }
        obj = new PhotoObject;
        signed = cloudinary.utils.signed_preloaded_image(upload_result);
        obj.set(config.parse_cloudinary_field, signed);
        Ti.API.debug("Saving: " + signed);
        return obj.save(null, {
          success: function() {
            Ti.API.debug("Model save successful!");
            Ti.App.fireEvent("uploaded_image");
            return $.getView().close();
          },
          error: function(error) {
            return handle_error(error);
          }
        });
      }, sign_result);
    },
    error: function(error) {
      return handle_error(error);
    }
  });
};

pick_image = function() {
  Ti.API.debug("Picking up an image");
  return Ti.Media.openPhotoGallery({
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
    success: function(data) {
      return upload_image(data);
    },
    error: function() {
      return function(error) {
        return handle_error(error);
      };
    },
    cancel: function() {
      Ti.API.debug('pick_image cancel');
      return $.getView().close();
    }
  });
};

$.getView().addEventListener('open', function() {
  return pick_image();
});
