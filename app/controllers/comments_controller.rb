class CommentsController < ApplicationController
  before_action :find_comment, only: [:show, :edit, :update]
  before_action :authenticate_user!, except: [:index, :show]

  def create
    @comment = @post.comments.create(comment_params)
    @comment.user = current_user
    @comment.save
  end

  def edit
    # 從使用者角度去看，評論文章
    @comment = current_user.comments.find(params[:id])
  end

  def update
    # 判斷討論區文章內容，是否有更新，更新成功，轉址回討論區的文章表
    if @comment.update(comment_params)
      redirect_to post_path(@comment.post)
    else
      render 'edit'
    end
  end

  def destroy
    # 軟刪除，comment，不用實體變數。
    comment = current_user.comments.find(params[:id])
    comment.destroy
    redirect_to post_path(@comment.post)
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def find_comment
    @post = Post.find(params[:post_id])
  end

end
