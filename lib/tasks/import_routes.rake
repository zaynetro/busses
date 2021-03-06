require_relative '../assets/config'

desc "Import routes"
task :import_routes => :environment do

  puts "Open bus_routes file"
  routes_file = open(ROUTES_FILENAME)
  puts "Read json"
  routes = JSON.parse(routes_file.read)
  puts "Close file"
  routes_file.close

  count = 0
  routes.each_with_index { |route, i|
    # Proceed to next if number is empty or nil
    next if route['number'].empty? || route['number'].nil?
    # Check if route exists
    r = Route.find_by(num: route['number'])
    next unless r.nil?
    # Create new Route
    puts "#{i}: Save route \##{route['number']}"
    r = Route.create(:num => route['number'], :description => route['description'])
    count += 1
  }

  puts "#{count} Routes were saved out of #{routes.length}"

end
