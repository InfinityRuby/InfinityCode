class Api::V1::QuestsController < ApplicationController

  # 查詢題目列表  /api/v1/quests
  def index
    @quests = Quest.all 

    render json: @quests
  end

  # 查詢指定題目  /api/v1/quests/:id
  def show
    @quests = Quest.find_by(id: params[:id]) 

    render json: @quests
  end
end