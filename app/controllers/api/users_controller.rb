class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def search
    @users = User.where("first_name ILIKE ? OR last_name ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%")
    render 'api/users/search'
  end
  
  def show
      @user = User.includes(:experiences, :educations).find(params[:id])
      render 'api/users/show'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/session/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
