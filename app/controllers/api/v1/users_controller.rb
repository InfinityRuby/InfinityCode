class Api::V1::UsersController < ApiController

  def index
    json_response(current_user, :created)
  end
end