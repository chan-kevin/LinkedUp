class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render 'api/session/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user == 'incorrect password'
      render json: { errors: ["That's not the right password."] }, status: :unauthorized
    elsif @user
      login!(@user)
      render 'api/session/show'
    else
      render json: { errors: ["Couldn't find a LinkedUp account associated with this email. Try again or create an account ."] }, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end