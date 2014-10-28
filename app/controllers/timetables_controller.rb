class TimetablesController < ApplicationController

  def index
    @timetables = Timetable.find_by(stop_id: params[:stop_id])
  end

end
