class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :quest

  before_create :change_coin

  def change_coin
    return if user.quests.where('answers.status = ?', "Success").include? quest   

    if quest.level == "Easy"
      user.update(coin_amount: user.coin_amount + 5)

    elsif quest.level == "Medium"
      user.update(coin_amount: user.coin_amount + 10)

    elsif quest.level == "Hard"
      user.update(coin_amount: user.coin_amount + 15)
    end
  end
end

