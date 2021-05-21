class ApiController < ApplicationController
  # 預設所有資料皆須登入方可取得
  before_action :authenticate_user!

end