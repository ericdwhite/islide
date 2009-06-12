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

/*
 * Log tests
 */
function testSpoolingLogger() {
  var spool = new SpoolingConsole(Log.INFO);
  assertEquals(spool.level, Log.INFO);

  var l = new Log('testSpoolingLogger', spool.console());
  l.trace("Hello World.");
  l.debug("Debug World.");
  l.info("Info World.");
  l.warn("Warn World.");
  l.error("Error World.");

  var messages = spool.contents;
  assertEquals(messages.length, 3);
  assertNotNull(/.*\s--\sInfo World.\n$/.exec(messages[0]));
  assertNotNull(/.*\s--\sWarn World.\n$/.exec(messages[1]));
  assertNotNull(/.*\s--\sError World.\n$/.exec(messages[2]));
}

//
// This needs to be run manually as it creates a popup
// during the run.
//
//function testAlertLogger() {
//  var l = new Log('testAlertLogger', BrowserAlert.console());
// l.trace("Hello World.");
//}

/*
 * Test Utilities
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

/*
 * Map Tests
 */
function testEmptyMap() {
  var m = new ISlide.Map();
  assertNull(m.get("Does not exist."));
}

function testPutMap() {
  var m = new ISlide.Map();
  m.put("One", 1);
  assertEquals(1, m.get("One"));
  assertNull(m.get("Two"));
}

function testEmptyKeysMap() {
  var m = new ISlide.Map();
  compareArray([], m.keys());
}

function testKeysMap() {
  var m = new ISlide.Map();
  m.put("Two", 2);
  m.put("One", 1);
  var keys = m.keys().sort();
  var expected = ["One", "Two"];
  compareArray(expected, keys);
}

function testEmptyValuesMap() {
  var m = new ISlide.Map();
  compareArray([], m.values());
}

function testValuesMap() {
  var m = new ISlide.Map();
  m.put("Two", 2);
  m.put("One", 1);
  var values = m.values().sort();
  var expected = [1, 2];
  compareArray(expected, values);
}


