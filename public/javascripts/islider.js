/**
* islide - image slider
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
 * Please see the islide/README for additional credits and information.
 */

function debug(msg){
  //alert(msg);
}

function Image(original, slide, thumbnail) {
  this.originalURL = original;
  this.slideURL = slide;
  this.thumbnailURL = thumbnail;
}

function Album() {
  this.currentImage = null;
  this.images = [];
}

Album.prototype.addImage = function(original, slide, thumbnail) {
  this.images.push(new Image(original, slide, thumbnail));
};

Album.prototype.nextImage = function() {
  debug("Images in array: " + this.images.length);

  if( this.images.length==0 ){
    return null;
  }

  if( this.currentImage==null ){
    this.currentImage = 0;
  }
  else {
    this.currentImage = this.currentImage + 1;
  }

  /* Ensure we are not past the image array */
  if( this.currentImage>=this.images.length ){
    return null;
  }

  return this.images[this.currentImage];
};



