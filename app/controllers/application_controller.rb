class ApplicationController < ActionController::Base
  before_action do
    I18n.locale = :"zh-TW" # Or whatever logic you use to choose.
  end
end
