class PostsController < ApplicationController
  def  index
  end

  def show
    @post = Post.find(params[:id])
  end
  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to post_path, notice: "新增留言成功!"
    else
      render 'new'
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
