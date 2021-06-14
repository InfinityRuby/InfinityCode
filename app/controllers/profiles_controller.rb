class ProfilesController < ApplicationController
  before_action :current_profile, only: [:show, :edit, :update]

  def show
    @badges = Badge.all
  end

  def edit
  end

  def update
      if @profile.update!(profile_params)
        redirect_to profile_path
      else
        render :edit
      end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :bio, :avatar)
  end

  def current_profile
    @profile = current_user.profile
  end
end