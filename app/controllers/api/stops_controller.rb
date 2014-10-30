class Api::StopsController < ApiController

  def index
    if(params[:num])
      num = params[:num]
      @stops = Stop.where("num LIKE ?", "%#{num}%").take(5)
    else
      @stops = Stop.all.take(5)
    end

    render :json => @stops.to_json
  end

end
