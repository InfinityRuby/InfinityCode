class QuestsController < ApplicationController
  def index
    
  end
  
  def show
    @quests = Quest.all 
    # find(params[:id])
    respond_to do |format|
      format.json { render json: @quests }
      format.html { render :show }
  end
  end
  def questdata
    render json: {title: "test"}
  end
  
end
