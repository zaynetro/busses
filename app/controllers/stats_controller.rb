class StatsController < ApplicationController

  def index
    @stats = Hash.new
    @stats['Server time'] = Time.new.inspect
    @stats['Stops'] = Stop.count
    @stats['Routes'] = Route.count
    @stats['Timetables'] = Timetable.count
  end

end
