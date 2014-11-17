# Save stops from matka API
require 'nokogiri'
require 'open-uri'

desc "Get stops"
task :get_stops => :environment do

  url = "http://api.matka.fi/timetables/?m=stop&company=SH:TUR"

  params = ["user", "pass", "x", "y", "radius", "count"]
  values = Hash.new

  puts "Get stops from developer.matka.fi"

  params.each { |p|
    print "#{p}: "
    values[p] = STDIN.gets.chomp
    url += "&#{p}=#{values[p]}"
  }

  doc = Nokogiri::XML(open(url))
  stop_nodes = doc.xpath("//STOP");

  puts "Resolved #{stop_nodes.length} stops"

  saved = 0
  stop_nodes.each_with_index { |stop, i|
    puts "#{i}: Go through stop"
    # Get attributes
    x = stop["xCoord"]
    y = stop["yCoord"]
    code = stop["code"]
    api_id = stop["id"]
    # Get stop name
    name = stop.xpath("name").text
    # Check if stop exists
    s = Stop.find_by(num: code)
    next unless s.nil?
    # Save stop
    s = Stop.create(:num => code,
                    :api_id => api_id,
                    :x => x,
                    :y => y,
                    :name => name)
    saved += 1 unless s.nil?
  }

  puts "#{saved} stops saved"

end
