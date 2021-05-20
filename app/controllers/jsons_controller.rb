class JsonsController < ApplicationController
  def data
    @post = Post.all.order("created_at DESC")
    respond_to do |format|
      format.json { render json: @post }
      format.html { render :data }
    end
  end
end
