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
var MESSAGES = null; // Setup in the JsUnit setUp

var UUID_IMAGE_1 = "054901a0-3a56-012c-e7c7-00112436d9cc";
var NAME_IMAGE_1 = "IMG1";
var SLIDE_IMAGE_1 = "slide/IMG1.jpg";
var ORIGINAL_IMAGE_1 = "original/IMG1.jpg";
var THUMBNAIL_IMAGE_1 = "thumbnail/IMG1.jpg";

/*
 * Factory methods
 */
function createAlbumWithOneImage() {
  var album = new Album();
  album.name = "Basic-Test-Album";
  album.addImage(UUID_IMAGE_1, NAME_IMAGE_1, ORIGINAL_IMAGE_1, SLIDE_IMAGE_1, THUMBNAIL_IMAGE_1);
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
  image.tagWith("Winter in France");
  image.tagWith("Cool");

  var tags = image.sortedTags();
  assertEquals("Cool", tags[0]);
  assertEquals("Winter in France", tags[1]);
}

/*
 * JSONAlbumParser tests
 */
var test_album = "{" +
  '"name": "2007/cote-dazur",' +
  '"tags": [' +
  '  "Cote D\'Azur", "summer", "France"' +
  '  ],' +
  '"images": [' +
  '  {' +
  '    "id": "054901a0-3a56-012c-e7c7-00112436d9cc",' +
  '    "name": "IMG_7275",' +
  '    "org": "2007/cote-dazur/IMG_7275.JPG",' +
  '    "slide": "2007/cote-dazur/slides/IMG_7275.JPG",' +
  '    "thumb": "2007/cote-dazur/thumbs/IMG_7275.JPG",' +
  '    "tags": [' +
  '        "First Image", "Nature"' +
  '      ],' +
  '  },' +
  '  {' +
  '    "id": "05492e70-3a56-012c-e7c8-00112436d9cc",' +
  '    "name": "IMG_7276",' +
  '    "org": "2007/cote-dazur/IMG_7276.JPG",' +
  '    "slide": "2007/cote-dazur/slides/IMG_7276.JPG",' +
  '    "thumb": "2007/cote-dazur/thumbs/IMG_7276.JPG"' +
  '  }' +
  ']' +
'}';
function testJSONAlbumParse() {
  var parser = new JSONAlbumParser();
  var album = parser.parse(test_album);
  assertEquals("2007/cote-dazur", album.name);
  assertEquals(2, album.images.length);

  var image1 = album.nextImage();
  //
  // Verify everything on image 1
  assertEquals("054901a0-3a56-012c-e7c7-00112436d9cc", image1.id);
  assertEquals("IMG_7275", image1.name);
  assertEquals("2007/cote-dazur/IMG_7275.JPG", image1.originalURL);
  assertEquals("2007/cote-dazur/slides/IMG_7275.JPG", image1.slideURL);
  assertEquals("2007/cote-dazur/thumbs/IMG_7275.JPG", image1.thumbnailURL);
  compareArray(["First Image", "Nature"], image1.sortedTags());

  // Verify the tags as they should be an empty list on image2
  var image2 = album.nextImage();
  compareArray([], image2.sortedTags());
}

function testJSONAblumParserWithEmptyAlbum() {
  var json = "{" +
    '"name": "2007/cote-dazur"' +
    '}';
  var album = new JSONAlbumParser().parse(json);
  assertEquals("2007/cote-dazur", album.name);
  assertEquals(0, album.images.length);
}

//
// These JsUnit methods are used to capture
// the log messages and display them to the
// console log which was added to the JsUnit
// source.
//
function setUp() {
  MESSAGES = new SpoolingConsole(Log.TRACE);
}

function tearDown() {
  showMessages(top.testManager._testFunctionName);
}

//
// Display any messages captured at the
// end of the test
//
function showMessages(test) {
  if(MESSAGES.contents.length > 0) {
    var main_document = top.$("frame")[0].contentWindow.document;
    var console = $("#consoleLog", main_document)[0].contentWindow.document;
    var messages = $("#console_text", console);
    messages.append("\n"+test+"\n---\n"+MESSAGES.contents);
  }
}

/*
 * Test Utilities (TODO Refactor into a common Test Utilities JS)
 */
function compareArray(expected, actual) {
  if(expected==null & actual==null ) {
    return;
  }
  assertNotNull(expected);
  assertNotNull(actual);
  assertEquals(expected.length, actual.length);
  for(var i=0; i<expected.length; i++) {
    assertEquals(expected[i], actual[i]);
  }
}
