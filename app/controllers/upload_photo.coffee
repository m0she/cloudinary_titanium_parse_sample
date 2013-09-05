cloudinary = require '/lib/cloudinary'
config = require('config').config
PhotoObject = require('parse_photo_album').PhotoObject

handle_error = (error) ->
  Ti.API.warn "Error: #{JSON.stringify error}"

  dialog = Ti.UI.createAlertDialog
    message: error.message || error
    title: 'Error uploading image'
    ok: 'Okay'
  dialog.addEventListener 'click', -> $.getView().close()
  dialog.show()

upload_image = (image) ->
  image_file = image.media.nativePath
  Ti.API.info "Signing #{image} #{image_file} #{JSON.stringify image}"
  Parse.Cloud.run config.parse_sign_cloud_function, {},
    success: (sign_result) ->
      Ti.API.info "sign finished: #{JSON.stringify sign_result}"
      Ti.API.info "Uploading: #{JSON.stringify image_file}"
      cloudinary.uploader.upload image_file, (upload_result) ->
        Ti.API.info "Upload done #{JSON.stringify upload_result}"
        return handle_error(upload_result.error) if upload_result.error

        obj = new PhotoObject
        signed = cloudinary.utils.signed_preloaded_image upload_result
        obj.set config.parse_cloudinary_field, signed
        Ti.API.debug "Signed: #{signed}"
        obj.save null,
          success: ->
            Ti.API.info "Model save successful!"
            $.getView().close()
          error: (error) ->
            handle_error(error)

        Ti.API.info "Upload finished: #{JSON.stringify arguments}"
      , sign_result
    error: (error) ->
      handle_error(error)


pick_image = ->
  Ti.API.info "Picking up an image"
  Ti.Media.openPhotoGallery
    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
    success: (data) -> upload_image(data)
    error: -> Ti.API.info 'pick_image error'
    cancel: -> Ti.API.info 'pick_image cancel'

$.getView().addEventListener 'open', -> pick_image()
