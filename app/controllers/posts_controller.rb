class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def  index
    @post = Post.all.order("created_at DESC")
    respond_to do |format|
      format.json { render json: @post }
      format.html { render :index }
    end
  end

  def show
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to demos_path
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
    redirect_to root_path
  end
  
  def find_post
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
