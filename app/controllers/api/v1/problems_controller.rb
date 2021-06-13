class Api::V1::ProblemsController < Api::V1::BaseController
  #api/v1/problems
  def index
    @problems = current_user.quests.distinct.where('answers.status = ?', "Success")
  end
  
  #api/v1/problems/id
  def show
    @problem = current_user.quests.find(params[:id]).answers.where(:status => 'Success' ,:user_id => current_user)
    
    @problems = Quest.find(params[:id]).answers.where(status: 'Success').order(created_at: :desc)
  end
end
