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

/**
 * Please see the top level README for additional credits and information.
 */

function trace(msg){
  //alert(msg);
}

function debug(msg){
  //alert(msg);
}

function info(msg){
  //alert(msg);
}

function error(msg){
  //alert(msg);
}


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
}

/*
 * Album or group of images
 */
function Album() {
  this.START = -1;
  this.currentImage = this.START;
  this.images = [];
}

Album.prototype.addImage = function(original, slide, thumbnail) {
  this.images.push(new Image(original, slide, thumbnail));
};

Album.prototype.nextImage = function() {
  debug("Images in array: " + this.images.length +
    " current image:" + this.currentImage);

  if( this.images.length==0 ){
    return null;
  }

  this.currentImage = this.currentImage + 1;
  if( this.currentImage >= this.images.length ){
    trace("Returning image:" + "null");
    return null;
  }

  trace("Returning image:" + this.currentImage);
  return this.images[this.currentImage];
};

Album.prototype.previousImage = function() {
  debug("Images in array: " + this.images.length +
    " current image:" + this.currentImage);

  if( this.images.length==0 ){
    return null;
  }

  this.currentImage = this.currentImage - 1;
  if( this.currentImage <= this.START ){
    trace("Returning image:" + "null");
    return null;
  }

  trace("Returning image:" + this.currentImage);
  return this.images[this.currentImage];
};

