require 'nokogiri'
require 'open-uri'
require 'json'
require_relative '../assets/config'

desc "Load bus routes"
task :load_routes => :environment do

  puts BASEURL
  break

  baseUrl = 'http://turku.seasam.com/traveller/'
  fetchUrl = baseUrl + 'matkainfo?command=aikataulukot'
  doc = Nokogiri::HTML(open(fetchUrl))

  # routes = doc.xpath('//div[@class="link_list"]/*')
  route_links = doc.css('div.link_list:first-of-type a')

  routes = []
  route_links.each { |route|
    num = route.text
    href = route['href']
    routes.push({ 'number' => num, 'url' => baseUrl + href }) unless num.nil? || href.nil?
    puts "Route \##{num} parsed"
  }

  filename = '../data/bus_routes.json'

  #target = open(filename, 'w')
  #target.write(routes.to_json)
  #target.close
  puts "#{routes.length} Bus routes saved to #{filename}"

end
