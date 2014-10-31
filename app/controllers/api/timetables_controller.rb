class Api::TimetablesController < ApplicationController

  def index
    @timetables = []

    if(params[:stop])
      stop = Stop.find_by(num: params[:stop])
      @timetables = Timetable.where(stop: stop)
    end

    render :json => @timetables.to_json
  end

end
