class Timetable < ActiveRecord::Base
  belongs_to :route
  belongs_to :stop

  def self.get_day(wday)
    case wday
    when 0
      "holiday"
    when 1..5
      "workday"
    when 6
      "saturday"
    end
  end

  def self.form_one_old(stop)
    wday = Timetable.get_day(Time.now.wday)
    tables = Timetable.where(stop: stop, weekday: wday)
    # Group by routes
    grouped = tables.group_by { |v| v.route_id }
    output = []
    grouped.each { |k,v|
      times = v.map { |entry| entry.time }
      output.push({ route: k, times: times, weekday: wday })
    }
    output
  end

  def self.form_one(stop)
    wday = Timetable.get_day(Time.now.wday)
    tables = Timetable.where(stop: stop, weekday: wday).select("route_id, weekday, time").order('time')
    tables.map { |t|
      { route: t.route_id, weekday: t.weekday, time: t.time.localtime }
    }
  end

end
