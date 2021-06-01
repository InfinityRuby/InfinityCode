class PostapiController < ApplicationController
  # kaminari套件
  # 【GET】 "/postapi/post?page=1" 1 = 指定第一頁 顯示六筆資料
  def post
    render json: Post.page(params[:page]).per(6).order(created_at: :desc)
  end

  def comments
  # 【GET】 "/postapi/comments?page=1" 1 = 指定第一頁 顯示六筆資料
    post = Post.find(params[:id])
    render json: post.comments.page(params[:page]).per(6).order(created_at: :desc)
  end
end
