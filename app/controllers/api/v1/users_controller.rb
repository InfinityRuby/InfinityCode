class Api::V1::UsersController < Api::V1::BaseController 
  def index
    json_response(current_user, :created)
  end

  #api/v1/users/1/answer_index
  def answer_index
    total_quest = Quest.count
    total_solved = current_user.answers.where(status: 'Success').count
    
    level_solved= current_user.quests.distinct.where('answers.status = ?', "Success").group(:level).count
    level_total = Quest.group(:level).count
    
    total_percentage = (total_solved / total_quest.to_f).round(2)
    easy_percentage = (level_solved["Easy"] / level_total["Easy"].to_f).round(2)
    medium_percentage = (level_solved["Medium"] / level_total["Medium"].to_f).round(2)
    hard_percentage = (level_solved["Hard"] / level_total["Hard"].to_f).round(2)

    json_response({
      total_percentage: total_percentage,
      easy_percentage: easy_percentage,
      medium_percentage: medium_percentage,
      hard_percentage: hard_percentage 
    })
  end
  
  private
  def answer_params
    params.require(:answer).permit(:quest_id, :user_id, :status)
  end
  
end