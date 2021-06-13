class Post < ApplicationRecord
  acts_as_paranoid
  acts_as_votable

  belongs_to :user
  has_many :comments

  default_scope { order(id: :desc) }

  after_commit do
    check_posts_achievement
    check_posts_anonymous
  end

  private
  # 檢查成就 - 貼文數 & 排行榜貼文數量第一
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

    # 發文數量是否第一
    posts_count = Post.unscope(:order).group(:user_id).order(count_id: :desc).count(:id)

    if(posts_count != nil)
      first_user = posts_count.keys.first

      if (first_user == @user.id)
        badge_id = 19

        create_achievement(badge_id)
      end
    end

    # 發文得讚數量是否第一
    users = []

    User.find_each do |user|
      likes = 0

      user.posts.each do |post|
        likes = likes + post.get_likes.count
      end

      users.push(user_id: user.id, user_likes: likes)
    end

    first_user = users.max{ |a, b| a[:user_likes] <=> b[:user_likes] }

    if (first_user[:user_id] == @user.id)
      badge_id = 19

      create_achievement(badge_id)
    end
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
