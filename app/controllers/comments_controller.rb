class CommentsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update]
  before_action :find_comment_id, only: [:edit, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def create
    @comment = @post.comments.create(comment_params)
    @comment.user = current_user
    @comment.save
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      redirect_to post_path(@comment.post)
    else
      render 'edit'
    end
  end

  def destroy
    comment.destroy
    redirect_to post_path(@comment.post)
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_comment_id
    @comment = current_user.comments.find(params[:id])
  end

end
