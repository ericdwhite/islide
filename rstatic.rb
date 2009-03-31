# Use thin+rack to server of the content for
# testing with JsUnit
#
# To Start:
# $ thin -R static.ru start
#
# To Browse:
# $ open http://localhost:3000
#

# Static content is rooted in the current working directory
#
root=Dir.pwd
puts ">>> Serving: #{root}"


RELOAD_SECONDS=1
ALLOWED_FOR_CACHING=/test\/javascripts/

# thin/controllers/controller.rb:load_rackup_config

class NonCachingFile < Rack::File
  def serving
    response = super
    return response if @path =~ ALLOWED_FOR_CACHING

    #
    # Don't cache included files for
    # our website neither in the unit, or
    # functional tests or in the application
    # itself.
    http_headers = response[1]
    http_headers["Cache-Control"] = "no-cache"

    response
  end
end

app = Rack::Builder.new {
  use Rack::CommonLogger
  run Rack::Directory.new("#{root}", NonCachingFile.new("#{root}"))
}
#Rack::Reloader.new(app, RELOAD_SECONDS)

# Return the app with the same name as this
# rackup configuration file.
Rstatic = app

#
# To install thin, and rack
#
# $ gem install rack
# $ gem install thin
#
# For additional information see:
#   thin - http://code.macournoyer.com/thin/
#   rack - http://rack.rubyforge.org/doc/classes/Rack/Directory.html
