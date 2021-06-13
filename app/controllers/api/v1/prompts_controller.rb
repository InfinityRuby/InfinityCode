class Api::V1::PromptsController < Api::V1::BaseController
  before_action :signed_in?

  # 查詢指定題目的提示列表
  # GET: /api/v1/quests/:quest_id/prompts
  def index
    quest = Quest.find(params[:quest_id])
    prompts = quest.prompts
    json_response(prompts)
  end

  # 查詢指定題目的特定提示
  # GET: /api/v1/prompts/:id
  def show
    prompt = Prompt.find(params[:id])
    json_response(prompt)
  end
end
