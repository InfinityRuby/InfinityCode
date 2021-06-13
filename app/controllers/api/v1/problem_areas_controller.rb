class Api::V1::ProblemAreasController < Api::V1::BaseController
  def index
    @problem_areas = current_user.quests.distinct.where('answers.status = ?', "Success")
  end

  def show
    @problem = current_user.quests.find(params[:id]).answers.where(:status => 'Success' ,:user_id => current_user)
    
    @problems = Quest.find(params[:id]).answers.where(status: 'Success').order(created_at: :desc)
  end
end
