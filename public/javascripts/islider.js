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
function Image(original, slide, thumbnail) {
  this.originalURL = original;
  this.slideURL = slide;
  this.thumbnailURL = thumbnail;
  this.tags = new ISlide.Map();
  this.l = new Log('Image', MESSAGES.console());
}

Image.prototype.tag = function(new_tag) {
  this.tags.put(new_tag, true);
};

Image.prototype.sorted_tags = function() {
  return this.tags.keys().sort();
}

/*
 * Album or group of images
 */
function Album() {
  this.START = -1;
  this.currentImage = this.START;
  this.images = [];
  this.l = new Log('Album', MESSAGES.console());
}

Album.prototype.addImage = function(original, slide, thumbnail) {
  this.l.trace("Adding image: " + original);
  this.images.push(new Image(original, slide, thumbnail));
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

  this.l.trace("Returning image:" + this.currentImage);
  return this.images[this.currentImage];
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
