var PhotoObject, cloudinary, config, handle_error, pick_image, upload_image;

cloudinary = require('/lib/cloudinary');

config = require('config').config;

PhotoObject = require('parse_photo_album').PhotoObject;

handle_error = function(error) {
  var dialog;
  Ti.API.warn("Error: " + (JSON.stringify(error)));
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
  Ti.API.info("Signing " + image + " " + image_file + " " + (JSON.stringify(image)));
  return Parse.Cloud.run(config.parse_sign_cloud_function, {}, {
    success: function(sign_result) {
      Ti.API.info("sign finished: " + (JSON.stringify(sign_result)));
      Ti.API.info("Uploading: " + (JSON.stringify(image_file)));
      return cloudinary.uploader.upload(image_file, function(upload_result) {
        var obj, signed;
        Ti.API.info("Upload done " + (JSON.stringify(upload_result)));
        if (upload_result.error) {
          return handle_error(upload_result.error);
        }
        obj = new PhotoObject;
        signed = cloudinary.utils.signed_preloaded_image(upload_result);
        obj.set(config.parse_cloudinary_field, signed);
        Ti.API.debug("Signed: " + signed);
        obj.save(null, {
          success: function() {
            Ti.API.info("Model save successful!");
            $.getView().fireEvent("uploaded_image");
            return $.getView().close();
          },
          error: function(error) {
            return handle_error(error);
          }
        });
        return Ti.API.info("Upload finished: " + (JSON.stringify(arguments)));
      }, sign_result);
    },
    error: function(error) {
      return handle_error(error);
    }
  });
};

pick_image = function() {
  Ti.API.info("Picking up an image");
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
      Ti.API.info('pick_image cancel');
      return $.getView().close();
    }
  });
};

$.getView().addEventListener('open', function() {
  return pick_image();
});
