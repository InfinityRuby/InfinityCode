class Api::V1::CommentsController < Api::V1::BaseController
  before_action :find_comment, only: [:show, :update, :destroy]

  # 新增特定文章的留言  
  # POST: /api/v1/posts/:post_id/comments
  # params: { content: '測試訊息' }
  def create
    @comment = current_user.comments.create!(comment_params.merge(post_id: params[:post_id]))
  end

  # 編輯指定文章  
  # PUT: /api/v1/comments/:id
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
    params.require(:comment).permit(:content)
  end

  def find_comment
    @comment = current_user.comments.find(params[:id])
  end
end