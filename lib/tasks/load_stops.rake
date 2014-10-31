require 'nokogiri'
require 'open-uri'
require 'json'

desc "Load route stops"
task :load_stops => :environment do

  baseUrl = 'http://turku.seasam.com/traveller/'
  filename = '../data/bus_routes.json'
  routes_file = open(filename);

  routes = JSON.parse(routes_file.read)
  routes_file.close

  puts 'Start going through routes'
  route_stops = []
  routes.each { |route|
    doc = Nokogiri::HTML(open(route['url']))
    rows = doc.css('table.list_table tr:not(.header)')

    rows.each { |row|
      stop = row.css('td:first-child').text
      link = row.css('td:nth-child(2) a').first
      href = link['href']
      name = link.text

      route_stops.push({ 'route' => route['number'], 'number' => stop, 'name' => name, 'url' => baseUrl + href }) unless stop.nil? || href.nil?
    }
    puts "Route \##{route['number']} parsed"
  }

  filename = '../data/route_stops.json'

  target = open(filename, 'w')
  target.write(route_stops.to_json)
  target.close

  puts "#{route_stops.length} Route stops saved to #{filename}"

end
