class Api::V1::PostsController < Api::V1::BaseController
  before_action :find_post, only: [:total_votes, :update, :destroy]
  before_action :signed_in?, except: [:index, :show, :user]

  # 【GET】 查詢文章列表  /api/v1/posts
  def index
    @posts = Post.order(created_at: :desc)
    json_response(@posts)
  end

  # 【POST】 新增文章  /api/v1/posts
  # body: { title: '標題', content: '內容' }
  def create
    @post = current_user.posts.create!(post_params)
    json_response(@post, :created)
  end

  # 【GET】 查詢指定文章  /api/v1/posts/:id
  def show
    @post = Post.find(params[:id])
    json_response(@post)
  end

  # 【PUT】 編輯指定文章  /api/v1/posts/:id
  # body: { title: '標題', content: '內容' }
  def update
    @post.update(post_params)
    head :no_content
  end

  # 【DELETE】 刪除指定文章  /api/v1/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  def user
    @post = Post.find(params[:id])
    render json: @post.user
  end

  def user_like
    @post = Post.find(params[:id])
    @result = current_user.liked? @post

    if @result
      @post.unliked_by current_user
    else
      @post.liked_by current_user
    end
    render json: {user_id: current_user.id, post_id: @post.id, liked: !@result}
  end

  def total_likes
    @total_like = @post.get_likes.size
    render json: {total_like: @total_like}
  end


  private
  def post_params
    params.require(:post).permit(:title, :content, :unknown)
  end

  def find_post
    @post = current_user.posts.find(params[:id])
  end
end