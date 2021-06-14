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

    easy = level_solved["Easy"]
    medium = level_solved["Medium"]
    hard = level_solved["Hard"]

    if quest_solved == 0 && total_quest.to_f == 0
      total_percentage = 0
    else
      total_percentage = (quest_solved / total_quest.to_f).round(2)
    end

    if easy == nil
      easy_percentage = 0
      easy = 0
    else
      easy_percentage = (easy / level_total["Easy"].to_f).round(2)
    end

    if medium == nil
      medium_percentage = 0
      medium = 0
    else
      medium_percentage = (medium / level_total["Medium"].to_f).round(2)
    end

    if hard == nil
      hard_percentage = 0
      hard = 0
    else
      hard_percentage = (hard / level_total["Hard"].to_f).round(2)
    end

    json_response({
      total_percentage: total_percentage,
      easy_percentage: easy_percentage,
      medium_percentage: medium_percentage,
      hard_percentage: hard_percentage,
      total_quest: total_quest,
      total_easy: level_total["Easy"].to_f,
      total_medium: level_total["Medium"].to_f,
      total_hard: level_total["Hard"].to_f,
      easy: easy,
      medium: medium,
      hard: hard
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