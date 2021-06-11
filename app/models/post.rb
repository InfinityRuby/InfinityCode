class Post < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :user
  has_many :comments

  default_scope { order(id: :desc) }

  after_commit do
    check_posts_achievement
    check_posts_anonymous
  end

  private
  # 檢查成就 - 貼文數
  def check_posts_achievement
    find_user

    posts_count = @user.posts.count

    case posts_count
    when 10
      badge_id = 1
    when 50
      badge_id = 2
    when 100
      badge_id = 3
    when 500
      badge_id = 4
    end

    create_achievement(badge_id)
  end

  # 檢查成就 - 單項成就 - 匿名發文
  def check_posts_anonymous
    find_user

    anonymous_post = @user.posts.where(anonymous: true).distinct.count

    case
    when anonymous_post > 0  # 匿名發文
      badge_id = 17
    end

    create_achievement(badge_id)
  end
end
