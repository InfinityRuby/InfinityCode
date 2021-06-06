class Api::V1::PostsController < Api::V1::BaseController
  before_action :find_user_post, only: [ :update, :destroy, :user_like]
  before_action :find_post,  only: [:show, :edit, :destroy, :update, :user, :user_like, :total_like]
  before_action :signed_in?, except: [:index, :show, :user]

  # 查詢文章列表  
  # GET: /api/v1/posts
  def index
    @posts = Post.order(created_at: :desc)
    json_response(@posts)
  end

  # 新增文章  
  # POST: /api/v1/posts
  # params: { title: '標題', content: '內容' }
  def create
    @post = current_user.posts.create!(post_params)
    json_response(@post, :created)
  end

  # 查詢指定文章  
  # GET: /api/v1/posts/:id
  def show
  end

  # 編輯指定文章  
  # PUT: /api/v1/posts/:id
  # params: { title: '標題', content: '內容' }
  def update
    @post.update(post_params)
    head :no_content
  end

  # 刪除指定文章  
  # DELETE: /api/v1/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  def user
    render json: @post.user
  end

  def user_like
    @result = current_user.liked? @post

    if @result
      @post.unliked_by current_user
    else
      @post.liked_by current_user
    end
    render json: {user_id: current_user.id, post_id: @post.id, liked: !@result}
  end

  def total_like
    @total_like = @post.get_likes.size
    render json: {total_like: @total_like}
  end


  private
  def post_params
    params.require(:post).permit(:title, :content, :anonymous)
  end

  def find_post
    @post = Post.find(params[:id])
  end

  def find_user_post
    @post = current_user.posts.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end