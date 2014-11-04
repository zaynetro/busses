require 'nokogiri'
require 'open-uri'
require_relative '../assets/config'

desc "Load bus routes"
task :load_routes => :environment do

  fetchUrl = BASEURL + URL_PARAMS
  doc = Nokogiri::HTML(open(fetchUrl))

  # routes = doc.xpath('//div[@class="link_list"]/*')
  route_links = doc.css('div.link_list:first-of-type a')

  routes = []
  route_links.each_with_index { |route, i|
    num = route.text
    href = route['href']
    routes.push({ 'number' => num, 'url' => BASEURL + href }) unless num.nil? || href.nil?
    puts "#{i}: Route \##{num} parsed"
  }

  target = open(ROUTES_FILENAME, 'w')
  target.write(routes.to_json)
  target.close
  puts "#{routes.length} Bus routes saved to #{ROUTES_FILENAME}"

end
