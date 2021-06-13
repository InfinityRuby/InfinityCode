class Api::V1::CommentsController < Api::V1::BaseController
  before_action :find_comment, only: [:show, :update, :destroy]
  before_action :signed_in?, except: [:index, :show]

  # 查詢特定文章的留言列表  
  # GET: /api/v1/posts/:post_id/comments
  def index
  end

  # 新增特定文章的留言  
  # POST: /api/v1/posts/:post_id/comments
  # params: { content: '測試訊息' }
  def create
    @comment = current_user.comments.create!(comment_params)
    json_response(@comment, :created)
  end

  # 查詢特定文章的單一留言  
  # GET: /api/v1/posts/:post_id/comments/:id
  def show
    json_response(@comment)
  end

  # 編輯指定文章  
  # PUT: /api/v1/posts/:post_id/comments/:id
  # params: { content: '測試訊息' }
  def update
    @comment.update(comment_params)
    head :no_content
  end

  # 刪除指定文章  
  # DELETE: /api/v1/posts/:post_id/comments/:id
  def destroy
    @comment.destroy
    head :no_content
  end

  private
  def comment_params
    params[:comment][:post_id] = params[:post_id]
    params.require(:comment).permit(:content, :post_id, :picture, :email)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_comment
    @comment = current_user.comments.find(params[:id])
  end

end