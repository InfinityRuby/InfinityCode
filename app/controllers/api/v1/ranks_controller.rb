class Api::V1::RanksController < Api::V1::BaseController

  # 查詢排行榜前十名 - 金幣數量
  # GET: /api/v1/ranks/coins
  def coins
  end

  # 查詢排行榜前十名 - 發文數量
  # GET: /api/v1/ranks/posts
  def posts
  end

  # 查詢排行榜前十名 - 得讚數量
  # GET: /api/v1/ranks/likes
  def likes
  end

  # 查詢排行榜前十名 - 解題數量
  # GET: /api/v1/ranks/solved
  def solved
  end
end
