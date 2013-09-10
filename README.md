
Cloudinary, Titanium and Parse - Photo Album sample
===================================================

Demo for writing an Titanium application using Parse as a backend and Cloudinary as image backend for storing,
applying transformations and serving of images.

For more details about **Cloudinary**: http://cloudinary.com/

For more details about **Titanium development**: http://www.appcelerator.com/developers/

For more details about **Parse**: https://www.parse.com/


## Setup and run the sample project

* [Sign up](https://cloudinary.com/users/register/free) for a free Cloudinary account
* [Register, download Titanium SDK, setup Titanium Studio and mobile SDKs](http://www.appcelerator.com/developers/)
* [Download](https://github.com/cloudinary/cloudinary_titanium_parse_sample/archive/master.zip) or [clone](https://github.com/cloudinary/cloudinary_titanium_parse_sample.git) this repository into your titanium workspace
* [Setup the Parse backend in 7 simple steps](https://github.com/cloudinary/cloudinary_parse#setup-the-sample-project)
* Copy the `app/lib/config.coffee.sample` file into `app/lib/config.coffee` and modify the configuration within it to reflect your Cloudinary cloud name and your Parse Application ID and Javascript Key.
* Import the project (File -> Import -> Titanium -> Existing Mobile Project -> Project directory -> Browse -> [Choose the cloudinary-titanium-parse-sample path])
* Run the application on an mobile device or a simulator (Run -> Run Configurations -> [Double click preferred run configuration] -> Run)

## How does it work
The application is composed of 4 top-level Alloy controllers (`login`, `list_photos`, `show_photo` and `upload_photo`), a generic grid view class (`app/lib/grid_view`), and a few external libraries.

All code is written in [CoffeeScript](http://coffeescript.org/) and compiled automatically by the titanium-assets plugin.

### Entry points
#### app/alloy.coffee
Invoked by alloy before anything else. It configures Cloudinary and Parse

#### index controller
The default controller that is openned by alloy. It creates and opens `login` controller.

### Upload process
The Cloudinary API key and API secret are protected in Parse cloud code. They are not bundled in the application and are not accessible by any user - making the design more secure and protecting yours and your users' privacy and data integrity.

In order to upload in image from the application:

* A request to upload is sent by the application to Parse backend using a cloud function.
* The cloud function (by default, `sign_upload_request`) creates a signed request (using Cloudinary API parameters) and returns it to the application.
* The application uploads the image to Cloudinary using the retrieved signed request. When the upload is complete, Cloudinary returns a signed result of the operation containing the image public\_id, other identifiers required to access the image and metadata about the image (disk size, dimensions, etc...)
* The application saves the signed reference of the image to Parse backend.
* The Parse beforeSave filter verifies the authenticity of the saved reference and aborts the process if it's invalid.

### Controllers
#### login
Displays a Chuck Norris power icon fetched from the official Facebook profile and transformed by Cloudinary.
Login is done using Parse backend in `doSubmit` function

#### list\_photos
Uses `grid_view` class to display a grid of all items. The collection of images is managed and retrieved using Parse.Collection SDK class (`app\lib\parse_photo_album.coffee`)
Also adds an additional (plus sign) image for uploading new images.

Uses:

* `app/lib/grid_view` library class - A basic framework for displaying a Backbone collection of items using alloy controllers
* `grid_main` controller - Handles whole grid behaviour
* `grid_child` controller - Handles each grid item behaviour

#### show\_photo
Displays a swipeable window with different transformations applied to the selected image

Uses:

* `image_tab` controller - Displays a cloudinary image using an identifier and a transformation object

#### upload\_photo
Invokes native photo gallary to allow user to select an image to upload.
Once the user selects an image, the [upload process](#uploadprocess) begins.

### External libraries
* [Cloudinary-Titanium library](https://github.com/cloudinary/cloudinary_titanium)
* [Ti.Parse](https://github.com/andreaspollak/Ti.Parse)

## Read more

[Cloudinary documentation](http://cloudinary.com/documentation)  
[Cloudinary for Titanium](https://github.com/cloudinary/cloudinary_titanium)  
[Cloudinary for Parse](https://github.com/cloudinary/cloudinary_parse)  

## Support

You can [open an issue through GitHub](https://github.com/cloudinary/cloudinary-android-parse-sample/issues).

Contact us at [info@cloudinary.com](mailto:info@cloudinary.com)

Or via Twitter: [@cloudinary](https://twitter.com/#!/cloudinary)

### Supported platforms
The sample has been tested on Android and iOS platforms.
Due to browser limitations, mobile web won't work with cloudinary

## Licenses

* This project is released under the MIT license.
