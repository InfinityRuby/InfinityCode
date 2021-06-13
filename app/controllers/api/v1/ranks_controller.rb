class Api::V1::RanksController < Api::V1::BaseController
  before_action :signed_in?

  # 查詢排行榜前十名 - 金幣數量
  # GET: /api/v1/ranks/coins
  def coins
  end

  # 查詢排行榜前十名 - 發文數量
  # GET: /api/v1/ranks/posts
  def posts
  end

  # 查詢排行榜前十名 - 得讚數量
  # GET: /api/v1/ranks/likes
  def likes
  end

  # 查詢排行榜前十名 - 解題數量
  # GET: /api/v1/ranks/solved
  def solved
  end

  #api/v1/ranks/coin_top_three
  def coin_top_three
    @users = User.limit(3).order('coin_amount desc')
  end

  #api/v1/ranks/post_top_three
  def post_top_three
    @user_posts_count = Post.unscope(:order).group(:user_id).order('COUNT(id) DESC').limit(3).count(:id)
    user_ids = @user_posts_count.keys

    @users = User.includes(:profile).where(id: user_ids).sort { |a, b| user_ids.index(a.id) <=> user_ids.index(b.id) }
  end

  #api/v1/ranks/comment_top_three
  def comment_top_three
    @user_comments_count = Comment.unscope(:order).group(:user_id).order('COUNT(id) DESC').limit(10).count(:id)
    user_ids = @user_comments_count.keys

    @users = User.includes(:profile).where(id: user_ids).sort { |a, b| user_ids.index(a.id) <=> user_ids.index(b.id) }
  end
end
