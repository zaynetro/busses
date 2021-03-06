require_relative '../assets/config'

desc "Import timetables"
task :import_timetables => :environment do

  puts "Open timetables file"
  timetables_file = open(TIMETABLES_FILENAME)
  puts "Read json"
  timetables = JSON.parse(timetables_file.read)
  puts "Close file"
  timetables_file.close

  saved = 0
  timetables.each_with_index { |timetable, i|
    # Proceed to next if times array/route/stop is empty
    next if timetable['times'].empty? || timetable['route'].empty? || timetable['stop'].empty?

    r = Route.find_by(num: timetable['route'])
    next if r.nil?

    s = Stop.find_by(num: timetable['stop'])
    next if s.nil?

    timetable['times'].each { |weekday, times|
      times.each { |time|
        t = Timetable.new
        t.route = r
        t.stop = s
        t.weekday = weekday
        t.time = time

        # Check if current entry exists
        next if Timetable.exists?(:route => t.route, :stop => t.stop, :weekday => t.weekday, :time => t.time)
        # If not save
        t.save

        saved += 1
      }
    }
    puts "#{i}: Went through valid timetable object"
  }

  puts "#{saved} Timetables were saved out of #{timetables.length}"

end
