class Api::V1::PromptsController < ApiController

  # 查詢指定題目的提示列表  /api/v1/quests/:quest_id/prompts
  def index
    @prompts = Prompt.where(questId: params[:quest_id])

    render json: @prompts
  end

  # 查詢指定題目的特定提示  /api/v1/quests/:quest_id/prompts/:id
  def show
    @prompt = Prompt.where(questId: params[:quest_id], aseq: params[:id])

    render json: @prompt
  end
end