class Api::V1::ProblemsController < Api::V1::BaseController
  before_action :authenticate_user!
  
  #api/v1/problems
  def index
  end
  
  #api/v1/problems/id
  def show
    
  end
end
