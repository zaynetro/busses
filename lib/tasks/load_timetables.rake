require 'nokogiri'
require 'open-uri'
require_relative '../assets/config'

desc "Load timetables"
task :load_timetables => :environment do

  bus_routes_file = open(ROUTES_FILENAME)
  bus_routes = JSON.parse(bus_routes_file.read)
  bus_routes_file.close

  route_stops_file = open(STOPS_FILENAME)
  route_stops = JSON.parse(route_stops_file.read)
  route_stops_file.close

  # Array of update routes (description was added)
  updated = []
  timetables = []
  days = DAYS
  route_stops.each_with_index { |stop, i|
    doc = Nokogiri::HTML(open(stop['url']))

    times = Hash.new
    days.each { |day| times[day] = [] }
    # Select schedule rows
    schedule = doc.css('form > table:nth-of-type(2)').css('tr.r0, tr.r1')
    schedule.each { |entry|
      # Hour is first column
      hour = entry.css('td:first-child').text.to_i
      next if hour.nil?
      # Workdays is first td.tdpadding column, Saturdays - second, Holidays - third
      node = entry.css('td.tdpadding').first
      cell = 0
      while !node.nil? && cell < 3 do
        # Somehow text nodes appear
        if node.name == 'td' then
          minutes = node.text
          # Remove everything except digits and split by every second character
          minutes = minutes.gsub(/[^\d]/, '').scan(/.{2}/)

          minutes.each { |minute|
            # If minutes add time to the day
            times[days[cell]].push(hour.to_s + ':' + minute)
          }

          cell += 1
        end

        node = node.next
      end

    }

    timetables.push({ 'stop' => stop['number'], 'route' => stop['route'], 'times' => times })

    puts "#{i}: Stop \##{stop['number']} parsed"

    next if updated.include? stop['route']

    # If route is unseen
    header = doc.css('table.otsikkoheader table tr:first-child')
    # Find it's description
    description = header.css('td:nth-child(2)')
    # Find route object
    index = bus_routes.index { |el| el['number'] == stop['route'] }
    # Set description
    bus_routes[index]['description'] = description.text
    # Mark as seen
    updated.push(stop['route'])
  }

  timetables_file = open(TIMETABLES_FILENAME, 'w')
  timetables_file.write(timetables.to_json)
  timetables_file.close
  puts "#{timetables.length} Timetables saved to #{TIMETABLES_FILENAME}"

  bus_routes_file = open(ROUTES_FILENAME, 'w')
  bus_routes_file.write(bus_routes.to_json)
  bus_routes_file.close
  puts "#{bus_routes.length} Bus routes saved"
  puts "And #{updated.length} updated"

end
