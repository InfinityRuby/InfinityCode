class PostsController < ApplicationController
  def  index
  end

  def new
    @post = Posts.new
  end

  def create
    @post = Posts.new(post_params)
  end

  private

  def post_params
    psrams.require(:post).permit(:title, :content)
  end
end
