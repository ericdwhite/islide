# This is the default location of the test runner
# if the web root '/' is the top level islide folder
#
# See: islide/rstaic.rb for details on how to launch a
#                       simple webserver to serve the
#                       content.
TEST_RUNNER="http://localhost:3000/test/javascripts/jsunit/testRunner.html"

# This command should launch a browser with the
# URL passed as the second parameter.
BROWSER_CMD="open"

#
# Lauches the test in the browser
#
# The location of the test runner and the relative paths
# to the test themselves are encoded in the test_url_for
# method.

class JsUnitTestRunner
  def execute_test(testfile)
    cmd = "#{BROWSER_CMD} #{test_url_for(testfile)}"
    sh cmd
  end

  def test_url_for(testfile)
    testpage = testfile #TODO: better URL handling
    autorun = true
    "\"#{TEST_RUNNER}?autoRun=#{autorun}&testpage=#{testpage}\""
  end
end
