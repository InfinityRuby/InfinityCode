class ApiController < ApplicationController
  include Response
  include ExceptionHandler

  def signed_in?
    if !user_signed_in?
      json_response({message:'invalid token'}, :unauthorized)
    end
  end
end