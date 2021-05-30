class PostapiController < ApplicationController
  # 以下為kaminari套件分頁寫法

  # 找post，show頁面api，每頁六筆資料。
  def postapi
    render json: Post.page(params[:page]).per(6).order('created_at: :desc')
  end

  def comments
    # 從討論區去找文章api，且每頁六筆資料。
    post = Post.find(params[:id])
    render json: post.comments.page(params[:page]).per(6).order('created_at: :desc')
  end
end
