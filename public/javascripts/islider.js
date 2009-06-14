/**
* islide - Image Slider
*
* Copyright (c) 2009 Eric D. White
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

// Default level
var MESSAGES = new SpoolingConsole(Log.INFO);

/*
 * An image normally containted within
 * an Album
 *
 * see: Album.addImage
 */
function Image(id, name, original, slide, thumbnail) {
  this.id = id;
  this.name = name;
  this.originalURL = original;
  this.slideURL = slide;
  this.thumbnailURL = thumbnail;
  this.tags = new ISlide.Map();
  this.l = new Log('Image', MESSAGES.console());
}

Image.prototype.tagWith = function(new_tag) {
  this.tags.put(new_tag, true);
};

Image.prototype.sortedTags = function() {
  return this.tags.keys().sort();
}

/*
 * Album or group of images
 */
function Album() {
  this.name = "";
  this.START = -1;
  this.currentImage = this.START;
  this.images = [];
  this.l = new Log('Album', MESSAGES.console());
}

Album.prototype.addImage = function(id, name, original, slide, thumbnail) {
  this.l.trace("Adding image: " + name);
  var image = new Image(id, name, original, slide, thumbnail);
  this.images.push(image);
  return image;
};

Album.prototype.nextImage = function() {
  this.l.debug("Images in array: " + this.images.length +
    " current image:" + this.currentImage);

  if( this.images.length==0 ){
    return null;
  }

  this.currentImage = this.currentImage + 1;
  if( this.currentImage >= this.images.length ){
    this.l.trace("Returning image:" + "null");
    return null;
  }

  var current = this.images[this.currentImage];
  this.l.trace("Returning image:" + this.currentImage +" "+current.name);
  return current;
};

Album.prototype.previousImage = function() {
  this.l.debug("Images in array: " + this.images.length +
    " current image:" + this.currentImage);

  if( this.images.length==0 ){
    return null;
  }

  this.currentImage = this.currentImage - 1;
  if( this.currentImage <= this.START ){
    this.l.trace("Returning image:" + "null");
    return null;
  }

  this.l.trace("Returning image:" + this.currentImage);
  return this.images[this.currentImage];
};

/*
 * JSONAlbumParser
 *
 * This parses a JSON representation and creates
 * and Album with images.
 */

function JSONAlbumParser() {
  this.l = new Log('JSONAlbumParser', MESSAGES.console());
}

JSONAlbumParser.prototype.parse = function(raw_json) {
  var cleaned_json = JSON.parse(raw_json);
  return this._album_parse(cleaned_json);
};

/*
 * Parse this type of JSON Structure
 *
{
  "name": "2007/cote-dazur",
  "tags": [
    "Cote D'Azur", "summer", "France"
    ],
  "images": [
    {
      "id": "054901a0-3a56-012c-e7c7-00112436d9cc",
      "name": "IMG_7275",
      "org": "2007/cote-dazur/IMG_7275.JPG",
      "slide": "2007/cote-dazur/slides/IMG_7275.JPG",
      "thumb": "2007/cote-dazur/thumbs/IMG_7275.JPG"
      "tags": [
          "First Image", "Nature"
        ]
    },
    {
      "id": "05492e70-3a56-012c-e7c8-00112436d9cc",
      "name": "IMG_7276",
      "org": "2007/cote-dazur/IMG_7276.JPG",
      "slide": "2007/cote-dazur/slides/IMG_7276.JPG",
      "thumb": "2007/cote-dazur/thumbs/IMG_7276.JPG"
    }
  ]
}
*/
JSONAlbumParser.prototype._album_parse = function(json) {
  this.l.trace("Parsing Album from json");
  var album = new Album();

  //
  // Album
  var name = json['name'];
  if( name==null ) {
    throw new SyntaxError('Failed to find Album name.');
  }
  album.name = name;
  this.l.info("Created album: " + name);

  // Optional album tags
  var album_tags = json['tags'];
  if( album_tags!=null ) {
    this.l.trace("Adding album tags.");
    this.l.warn("Ignoring album tags.");
  }

  var images = json['images'];
  if( images==null ){
    // we are finished, with an unintersting and
    // empty album.
    this.l.warn("An album named '"+album.name+"' with no images was found.")
    return album;
  }

  for(var i=0; i<images.length; i++) {
    this.l.trace("Parsing image "+i+" from json.");
    var image = images[i];
    var currentImage = album.addImage(image['id'], image['name'],
			              image['org'], image['slide'], image['thumb']);

    this.l.info("Adding image '"+currentImage.name+"' to album '"+album.name+"'.");
    var image_tags = image['tags'];
    if( image_tags==null) {
      continue;
    }

    // Optional image tags
    for(var j=0; j<image_tags.length; j++) {
      currentImage.tagWith(image_tags[j]);
    }
  }
  return album;
};











