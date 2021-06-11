class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :quest

  before_create :change_coin
  after_commit do
    check_quests_level
    check_solved_quests
  end

  private
  def change_coin
    return if user.quests.where('answers.status = ?', "Success").include? (quest)

    if quest.level == "Easy"
      user.update(coin_amount: user.coin_amount + 5)

    elsif quest.level == "Medium"
      user.update(coin_amount: user.coin_amount + 10)

    elsif quest.level == "Hard"
      user.update(coin_amount: user.coin_amount + 15)
    end
  end

  # 檢查成就 - 解題難度
  def check_quests_level
    find_user
    easy_quests = Quest.where(level: 'Easy').count
    medium_quests = Quest.where(level: 'Medium').count
    hard_quests = Quest.where(level: 'Hard').count

    easy_solved = @user.quests.where(level: 'Easy').distinct.count
    medium_solved = @user.quests.where(level: 'Medium').distinct.count
    hard_solved = @user.quests.where(level: 'Hard').distinct.count

    case 
    when easy_quests == easy_solved
      badge_id = 21
    when medium_quests == medium_solved
      badge_id = 22
    when hard_quests == hard_solved
      badge_id = 23
    end
    
    create_achievement(badge_id)
  end
  
  # 檢查成就 - 解題數量
  def check_solved_quests
    find_user
    total_solved = @user.answers.where(status: 'Success').distinct.count

    case total_solved
    when 10
      badge_id = 24
    when 100
      badge_id = 25
    when 500
      badge_id = 26
    end
    
    create_achievement(badge_id)
  end
end
