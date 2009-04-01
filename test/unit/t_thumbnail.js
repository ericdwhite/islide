/**
 *
 */

function testGetSlideAImageForThumbnail() {
  var album = new Album();
  SLIDE_IMAGE = "slide/IMG1.jpg";
  album.addImage("original/IMG1.jpg", SLIDE_IMAGE, "thumbnail/IMG1.jpg");

  var image = album.nextImage();
  assertNotNull(image);
  assertEquals(SLIDE_IMAGE, image.slideURL);
}

function xtestGetSlideAImageForThumbnailInEmptyAlbum() {
  var album = new Album();
  var image = album.nextImage();
  assertEquals(null, image);
}
