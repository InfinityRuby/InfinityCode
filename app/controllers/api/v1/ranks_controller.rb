class Api::V1::RanksController < Api::V1::BaseController
  #api/v1/ranks
  def coin
    @users = User.limit(10).order('coin_amount desc')
  end

  #api/v1/ranks/post_rank
  def post
    @user_posts_count = Post.unscope(:order).group(:user_id).order('COUNT(id) DESC').limit(10).count(:id)
    user_ids = @user_posts_count.keys

    @users = User.includes(:profile).where(id: user_ids).sort { |a, b| user_ids.index(a.id) <=> user_ids.index(b.id) }
  end

  #api/v1/ranks/comment_rank
  def comment
    @user_comments_count = Comment.unscope(:order).group(:user_id).order('COUNT(id) DESC').limit(10).count(:id)
    user_ids = @user_comments_count.keys

    @users = User.includes(:profile).where(id: user_ids).sort { |a, b| user_ids.index(a.id) <=> user_ids.index(b.id) }
  end
end
