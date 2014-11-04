require 'nokogiri'
require 'open-uri'
require_relative '../assets/config'

desc "Load route stops"
task :load_stops => :environment do

  routes_file = open(ROUTES_FILENAME);
  routes = JSON.parse(routes_file.read)
  routes_file.close

  puts 'Start going through routes'
  route_stops = []
  routes.each_with_index { |route, i|
    doc = Nokogiri::HTML(open(route['url']))
    rows = doc.css('table.list_table tr:not(.header)')

    rows.each { |row|
      stop = row.css('td:first-child').text
      link = row.css('td:nth-child(2) a').first
      href = link['href']
      name = link.text

      route_stops.push({ 'route' => route['number'], 'number' => stop, 'name' => name, 'url' => BASEURL + href }) unless stop.nil? || href.nil?
    }
    puts "#{i}: Route \##{route['number']} parsed"
  }

  target = open(STOPS_FILENAME, 'w')
  target.write(route_stops.to_json)
  target.close

  puts "#{route_stops.length} Route stops saved to #{STOPS_FILENAME}"

end
