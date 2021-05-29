class Api::V1::PromptsController < Api::V1::BaseController
  before_action :signed_in?

  # 【GET】 查詢指定題目的提示列表  /api/v1/quests/:quest_id/prompts
  def index
    @prompts = Prompt.where(quest_id: params[:quest_id])
    json_response(@prompts)
  end

  # 【GET】查詢指定題目的特定提示  /api/v1/quests/:quest_id/prompts/:id
  def show
    @prompt = Prompt.where(quest_id: params[:quest_id], aseq: params[:id])
    json_response(@prompt)
  end
end
