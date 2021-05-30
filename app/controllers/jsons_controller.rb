class JsonsController < ApplicationController
  def data
    render json: Post.order("created_at DESC")
  end

  def posts_comments
    render json: Comment.where(post_id: params[:id]).order("created_at DESC")
  end
end
