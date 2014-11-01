class Api::TimetablesController < ApiController

  def index
    @timetables = []

    if(params[:stop])
      stop = Stop.find_by(num: params[:stop])
      @timetables = Timetable.form_one(stop)
    end

    render :json => @timetables.to_json
  end

end
