class Api::V1::CoinsController < Api::V1::BaseController
  before_action :signed_in?

  def index
    @coins = current_user.coins
    json_response(@coins)
  end

  def create
    @coins = current_user.coins.create!(coin_params)
    json_response(@coins, :created)
  end

  private
  def coin_params
    params.require(:coin).permit(:coin_change, :description)
  end
end