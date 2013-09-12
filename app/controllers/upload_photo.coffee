cloudinary = require '/lib/cloudinary'
config = require('config').config
PhotoObject = require('parse_photo_album').PhotoObject

handle_error = (error) ->
  Ti.API.info "Error: #{JSON.stringify error}"

  dialog = Ti.UI.createAlertDialog
    message: error.message || error
    title: 'Error uploading image'
    ok: 'Okay'
  dialog.addEventListener 'click', -> $.getView().close()
  dialog.show()

upload_image = (image) ->
  image_file = image.media.nativePath
  Ti.API.debug "Signing #{image_file}"
  Parse.Cloud.run config.parse_sign_cloud_function, {},
    success: (sign_result) ->
      Ti.API.debug "Uploading: #{JSON.stringify sign_result}"
      cloudinary.uploader.upload image_file, (upload_result) ->
        Ti.API.debug "Upload done: #{JSON.stringify upload_result}"
        return handle_error(upload_result.error) if upload_result.error

        obj = new PhotoObject
        signed = cloudinary.utils.signed_preloaded_image upload_result
        obj.set config.parse_cloudinary_field, signed
        Ti.API.debug "Saving: #{signed}"
        obj.save null,
          success: ->
            Ti.API.debug "Model save successful!"
            Ti.App.fireEvent "uploaded_image"
            $.getView().close()
          error: (error) ->
            handle_error(error)
      , sign_result
    error: (error) ->
      handle_error(error)


pick_image = ->
  Ti.API.debug "Picking up an image"
  Ti.Media.openPhotoGallery
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
    success: (data) -> upload_image(data)
    error: -> (error) -> handle_error(error)
    cancel: ->
      Ti.API.debug 'pick_image cancel'
      $.getView().close()

$.getView().addEventListener 'open', -> pick_image()
