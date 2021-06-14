class Api::V1::PostsController < Api::V1::BaseController
  before_action :find_user_post, only: [:destroy, :update]
  before_action :find_post, only: [:show, :user_like, :total_like, :is_like?]
  before_action :signed_in?, except: [:index, :show]



  # 查詢文章列表  
  # GET: /api/v1/posts
  def index
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
  # GET: /api/v1/posts/:id           建立時間，逆向排序
  # GET: /api/v1/posts/:id?order=asc 建立時間，正向排序
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

  def is_like?
    @result = current_user.liked? @post
    json_response(@result)
  end

  #【GET】 查詢指定文章，使用者是否點過讚 /api/v1/posts/:id/like
  def user_like
    @result = current_user.liked? @post

    if @result
      @post.unliked_by current_user
    else
      @post.liked_by current_user
    end
    render json: {user_id: current_user.id, post_id: @post.id, liked: !@result}
  end

  #【GET】 查詢指定文章點讚總數  /api/v1/posts/:id/totallike
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
end