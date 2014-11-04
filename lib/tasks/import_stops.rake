require_relative '../assets/config'

desc "Import stops"
task :import_stops => :environment do
  puts "Open route_stops file"
  stops_file = open(STOPS_FILENAME)
  puts "Read json"
  stops = JSON.parse(stops_file.read)
  puts "Close file"
  stops_file.close

  count = 0
  stops.each_with_index { |stop, i|
    # Proceed to next if number is empty or nil
    next if stop['number'].empty? || stop['number'].nil?
    # Check if stop exists
    s = Stop.find_by(num: stop['number'])
    next unless s.nil?
    # Create new Route
    puts "#{i}: Save stop \##{stop['number']}"
    s = Stop.create(:num => stop['number'], :name => stop['name'])
    count += 1
  }

  puts "#{count} Stops were saved out of #{stops.length}"

end
