class StopsController < ApplicationController

  def new
  end

  def index
    if(params[:number])
      num = params[:number]
      @stops = Stop.where("number LIKE ?", "%#{num}%")
    else
      @stops = Stop.all
    end

    respond_to do |format|
      format.html
      format.json{
        render :json => @stops.to_json
      }
    end
  end

  def create
    @stop = Stop.new(stop_params)

    if @stop.save()
      redirect_to @stop
    else
      render 'new'
    end
  end

  def show
    @stop = Stop.find(params[:id])
  end

  def destroy
    @stop = Stop.find(params[:id])
    @stop.destroy
    redirect_to stops_path
  end

end

private
  def stop_params
    params.require(:stop).permit(:number, :name)
  end
