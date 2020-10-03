class SessionsController < ApplicationController
  respond_to? :json
  before_action :validate_user!, except: [:create]

  def new
  end

  def user 
    user = User.find(@current_user_id)
    render json: user.as_json(only: [:email, :id])
          .merge("token": user.generate_jwt)
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      render json: user.as_json(only: [:email])
                      .merge("token": user.generate_jwt)
    else
      render json: { errors: {'email or password': ["is invalid"]}}, 
                    status: :unprocessable_entity
    end
  end

  def destroy
    # If token is saved in DB, you can destroy it here
     head(:ok, status: :no_content) 
  end
  
end