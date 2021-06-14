class Api::V1::ProblemsController < Api::V1::BaseController
  #api/v1/problems
  def index
    @problems = current_user.quests.distinct.where('answers.status = ?', "Success")
  end
  
  #api/v1/problems/id
  def show
    
  end
end
