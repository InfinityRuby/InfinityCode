class Api::V1::BaseController < ApplicationController
  include Response
  include ExceptionHandler
  include Convert

  before_action :authenticate_user!
end