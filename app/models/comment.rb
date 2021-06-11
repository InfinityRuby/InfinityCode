class Comment < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :post
  belongs_to :user

  default_scope { order(id: :desc) }

  after_commit :check_comments_achievement

  private
  # 檢查成就 - 留言數
  def check_comments_achievement
    find_user
    
    comments_count = @user.comments.count

    case comments_count
    when 10
      badge_id = 5
    when 50
      badge_id = 6
    when 100
      badge_id = 7
    when 500
      badge_id = 8
    end
    
    create_achievement(badge_id)
  end
end
