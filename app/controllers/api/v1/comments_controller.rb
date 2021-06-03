class Api::V1::CommentsController < ApiController
  before_action :find_comment, only: [:show, :update, :destroy]
  before_action :signed_in?, except: [:index, :show]

  # 【GET】 查詢特定文章的留言列表  /api/v1/posts/:post_id/comments
  def index
    @comments = Comment.where(post_id: params[:post_id]).order("created_at DESC")
    json_response(comments: @comments, user: current_user.as_json(only: [:id, :email]), avatar: current_user.profile.avatar)
  end

  # 【POST】 新增特定文章的留言  /api/v1/posts/:post_id/comments
  # body: { content: '測試訊息' }
  def create
    @comment = current_user.comments.create!(comment_params)
    json_response(@comment, :created)
  end

  # 【GET】 查詢特定文章的單一留言  /api/v1/posts/:post_id/comments/:id
  def show
    json_response(@comment)
  end

  # 【PUT】 編輯指定文章  /api/v1/posts/:post_id/comments/:id
  # body: { content: '測試訊息' }
  def update
    @comment.update(comment_params)
    head :no_content
  end

  # 【DELETE】 刪除指定文章  /api/v1/posts/:post_id/comments/:id
  def destroy
    @comment.destroy
    head :no_content
  end

  def upvote
    @comment = Post.find(params[:id])
    @result = current_user.liked? @comment
    @comment.like_by current_user

    if @result
      @comment.unliked_by current_user
    else
      @comment.liked_by current_user
    end
    redirect_to posts_path

  end

  private
  def comment_params
    params[:comment][:post_id] = params[:post_id]
    params.require(:comment).permit(:content, :post_id, :email, :picture)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_comment
    @comment = current_user.comments.find_by(post_id: params[:post_id], id: params[:id])
  end

end