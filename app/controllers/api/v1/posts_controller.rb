class Api::V1::PostsController < Api::V1::BaseController
  before_action :find_post, only: [:update, :destroy]
  before_action :signed_in?, except: [:index, :show, :user]

  # 【GET】 查詢文章列表  /api/v1/posts
  def index
  end

  # 【POST】 新增文章  /api/v1/posts
  # body: { title: '標題', content: '內容' }
  def create
    @post = current_user.posts.create!(post_params)
    json_response(@post, :created)
  end

  # 【GET】 查詢指定文章  /api/v1/posts/:id
  def show
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

  # def publish_author
  #   @posh.update(post_params).merge(author.name)
  #   render :json {author: author.name}
  # end

  private
  def post_params
    params.require(:post).permit(:title, :content, :publish_author)
  end

  def find_post
    @post = current_user.posts.find(params[:id])
  end
end