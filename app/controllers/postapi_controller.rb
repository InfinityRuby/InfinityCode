class PostapiController < ApplicationController
  # 以下為kaminari套件分頁寫法

  # 找post，show頁面api，每頁六筆資料。
  # api url GET "/postapi/Data ?page=1" 1 = 指定第一頁
  # 如果不足六筆 預設只有第一頁。
  def post
    render json: Post.page(params[:page]).per(6).order(created_at: :desc)
  end

  def comments
    # 從討論區去找文章api，且每頁六筆資料。
    post = Post.find(params[:id])
    render json: post.comments.page(params[:page]).per(6).order(created_at: :desc)
  end
end
