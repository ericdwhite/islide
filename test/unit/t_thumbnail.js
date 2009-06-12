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

// Overide the default logging
MESSAGES = new SpoolingConsole(Log.ERROR);

var SLIDE_IMAGE_1 = "slide/IMG1.jpg";
var ORIGINAL_IMAGE_1 = "original/IMG1.jpg";
var THUMBNAIL_IMAGE_1 = "thumbnail/IMG1.jpg";

/*
 * Factory methods
 */
function createAlbumWithOneImage() {
  var album = new Album();
  album.addImage(ORIGINAL_IMAGE_1, SLIDE_IMAGE_1, THUMBNAIL_IMAGE_1);
  return album;
}


/*
 * Album Tests
 */
function testGetAnImageFromAnAlbum() {
  var album = createAlbumWithOneImage();

  var image = album.nextImage();
  assertNotNull(image);
  assertEquals(SLIDE_IMAGE_1, image.slideURL);
  assertEquals(ORIGINAL_IMAGE_1, image.originalURL);
  assertEquals(THUMBNAIL_IMAGE_1, image.thumbnailURL);
}

function testGetNextSlideImageInEmptyAlbum() {
  var album = new Album();
  var image = album.nextImage();
  assertEquals(null, image);
}

function testMovePastTheLastImage() {
  var album = createAlbumWithOneImage();
  var image1 = album.nextImage();
  assertNotNull(image1);

  var image2 = album.nextImage();
  assertNull(image2);
}

function testPreviousImage() {
  var album = createAlbumWithOneImage();
  var image1 = album.nextImage();
  assertNotNull(image1);

  var image2 = album.nextImage();
  assertNull(image2);

  var image3 = album.previousImage();
  assertEquals(image1, image3);
  assertEquals(image1.slideURL, image3.slideURL);
}

function testMoveBeforeTheFirstImage() {
  var album = createAlbumWithOneImage();
  var image1 = album.nextImage();
  assertNotNull(image1);

  var image2 = album.previousImage();
  assertNull(image2);
}

/*
 * Image tests
 */
function testTagImage() {
  var album = createAlbumWithOneImage();
  var image = album.nextImage();
  image.tag("Winter in France");
  image.tag("Cool");

  var tags = image.sorted_tags();
  assertEquals("Cool", tags[0]);
  assertEquals("Winter in France", tags[1]);
}

//
// Display any messages captured at the
// end of the test
//
function testShowMessages() {
  if(MESSAGES.contents.length > 0) {
    alert(MESSAGES.contents);
  }
}
