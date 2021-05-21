class UsersController < ApplicationController
  def index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @profile = @user.create_profile
      redirect_to root_url 
    else
      render :new 
    end

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    if resource.errors.empty?
      set_flash_message(:notice, :confirmed) if is_flashing_format?
      sign_in(resource_name, resource)
      respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
    else
      redirect_to new_user_session_path
      # respond_with_navigational(resource.errors, :status => :unprocessable_entity){ render :new }
    end 
  end
end