class JsonsController < ApplicationController
  def data
    render json: Post.all.order("created_at DESC")
  end

  def commentsJson
    render json: Comment.where(post_id: params[:id]).order("created_at DESC")
  end
end
