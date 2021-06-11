class Api::V1::UsersController < Api::V1::BaseController 
  def index
    json_response(current_user)
  end

  # 查詢特定使用者的解題完成率
  # GET: api/v1/users/1/completed_rate
  def completed_rate
    total_quest = Quest.count

    quest_solved = current_user.quests.distinct.where('answers.status = ?', "Success").count
    level_solved = current_user.quests.distinct.where('answers.status = ?', "Success").group(:level).count
    level_total = Quest.group(:level).count

    
    total_percentage = (quest_solved / total_quest.to_f).round(2)
    easy_percentage = (level_solved["Easy"] / level_total["Easy"].to_f).round(2)
    medium_percentage = (level_solved["Medium"] / level_total["Medium"].to_f).round(2)
    hard_percentage = (level_solved["Hard"]/ level_total["Hard"].to_f).round(2)

    json_response({
      total_percentage: total_percentage,
      easy_percentage: easy_percentage,
      medium_percentage: medium_percentage,
      hard_percentage: hard_percentage 
    })
  end

  def update
    current_user.update(user_params)
  end

  private
  def user_params
    params.require(:user).permit(:coin_amount)
  end
end