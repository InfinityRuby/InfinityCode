class Api::V1::QuestsController < ApiController
  before_action :signed_in?, except: [:index, :show]

  # 【GET】查詢題目列表  /api/v1/quests
  def index
    @quests = Quest.all 

    json_response(@quests)
  end

  # 【GET】查詢指定題目  /api/v1/quests/:id
  def show
    @quest = Quest.find_by(id: params[:id]) 

    json_response(@quest)
  end
end