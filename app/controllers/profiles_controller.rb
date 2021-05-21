class ProfilesController < ApplicationController

  def new
    @profile = current_user.build_profile
  end

  def create
    @user = User.find(params[:user_id])
    @profile = @user.profile.create(profile_params)

    if @profile.save
      redirect_to @user
    else
      render 'new'
    end
  end

  def show
    # @profile = Profile.find_by(user_id: params[:user_id])
    @profile = current_user.profile
  end

  def edit
    @profile = current_user.profile
  end

  def update
    @profile = current_user.profile
      if @profile.update!(profile_params)
        redirect_to @profile, notice: 'Profile was successfully updated.'
      else
        render :edit
      end
  end

  def delete
    @profile = current_user.profile.find(params[:id])
    @profile.destroy
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :bio, :avatar)
  end
end

  