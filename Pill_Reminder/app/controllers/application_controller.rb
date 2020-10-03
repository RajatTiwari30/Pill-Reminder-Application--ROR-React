class ApplicationController < ActionController::API
  #protect_from_forgery unless: -> { request.format.json?}
  before_action :validate_user!, except: [:login]
  

  private
  def validate_user! 
    if request.headers['Authorization'].present?
      # {'Authorization' : 'Bearer <TOKEN>'}
      token = request.headers["Authorization"]
      token = token.split(" ")[1]  # Remove "Bearer"

      begin 
        jwt_payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
        @current_user_id = jwt_payload['id']

      rescue => exception 
        head :unauthorized
      end
    else 
      head :unauthorized
    end
  end
  
end
