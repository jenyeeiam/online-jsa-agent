class SessionsController < ApplicationController
  def check_user_type(token)
    authenticate_coach(token) || authenticate_player(token)
  end

  def login
    payload = {data: params[:email]}
    token = JWT.encode payload, Rails.application.secrets[:hmac_secret], 'HS256'
    if Player.find_by(email: params[:email]).try(:authenticate, params[:password])
      puts 'player login'
      render json: {
        token: token,
        user: 'player',
        id: Player.find_by(email: params[:email]).id
      }
    elsif Coach.find_by(email: params[:email]).try(:authenticate, params[:password])
      puts 'coach login'
      render json: {token: token, user: 'coach', id: Coach.find_by(email: params[:email]).id}
    else
      render json: {error: 'Incorrect email or password. 不正確な電子メールまたはパスワード'}
    end
  end
end
