class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def  index
    @post = Post.all.order("created_at DESC")
  end

  def show
  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to posts_path(@post),notice: "新增留言成功!"
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render 'edit'
    end
  end
  
  def destroy
    @post.destroy
    redirect_to posts_path
  end
  
  def find_post
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
