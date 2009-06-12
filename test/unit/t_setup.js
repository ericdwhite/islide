//
// This test can be used to verify the environment
// is setup correctly.
//   The result should be:
//     RUNS: 4
//     ERRORS: 0
//     FAILURES: 2 (testStringFailure, testBooleanFailure)

//
// Normally this is the code under test and should
// be placed in its own JavaScript files.
function userSubmits(message, buttonElement) {
  buttonElement.submit();
}

//
// Tests

var setUpCalled = false;
function setUp() {
  // if this is called it is most likely
  // that tearDown() will also be called.
  setUpCalled = true;
}

// This should pass if JsUnit is correctly
// installed as it should have called setup.
function testSetupCalled() {
  assertEquals(true, setUpCalled);
}

// Should fail
function testBooleanFailure() {
  assertEquals(true, false);
}

// Should fail
function testStringFailure() {
  assertEquals("the same", "is not the same");
}

// Should pass if JsMock is working
function testJsMockVerify() {
  var mockControl = new MockControl();
  var buttonMock = mockControl.createMock(
		     {
		       submit : function() {
			 this.value = "Clicked";
		       }
		     });

  buttonMock.expects().submit();

  // Normally the buttonMock would be a real
  // button element.
  userSubmits("Some user message", buttonMock);

  mockControl.verify();
}
