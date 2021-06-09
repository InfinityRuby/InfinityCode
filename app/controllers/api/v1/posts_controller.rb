class Api::V1::PostsController < Api::V1::BaseController
  before_action :find_post, only: [:update, :destroy]
  before_action :signed_in?, except: [:index, :show, :user]

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

  private
  def post_params
    params.require(:post).permit(:title, :content, :anonymous)
  end

  def find_post
    @post = current_user.posts.find(params[:id])
  end
end