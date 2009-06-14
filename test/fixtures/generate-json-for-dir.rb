#!/usr/bin/env ruby
#
# This is some quick code to scan
# folders quickly generate some JSON
# to use for testing.
#
# Usage:
#  ./generate-json-for-dir.rb ../../public/photos

DIR=ARGV[0]
require 'rubygems'
require 'uuid'

class JsonImage 
  def initialize(slide_image)
    @slide_image = slide_image.to_s
    @uuidgenerator = UUID.new
  end

  def to_json
    @id = @uuidgenerator.generate()
    @content_type = @slide_image[@slide_image.rindex('.') + 1, @slide_image.length()]
    @name = File.basename(@slide_image, "."+@content_type)
    @original_image = @slide_image.gsub('/slides/', '/')
    @thumb_image = @slide_image.gsub('/slides/', '/thumbs/')

    json = "{\n"
    json <<"  \"id\": \"#{@id}\",\n"
    json <<"  \"name\": \"#{@name}\",\n"
    json <<"  \"org\": \"#{@original_image}\",\n"
    json <<"  \"slide\": \"#{@slide_image}\",\n"
    json <<"  \"thumb\": \"#{@thumb_image}\"\n"
    json << "},\n"
    json
  end
end

entries = Dir.glob(File.join(DIR, '**/slides/*.JPG'))
entries.each do |entry|
  slide_image = entry[DIR.length() + 1, entry.length()]
  image = JsonImage.new(slide_image)
  puts image.to_json
end
