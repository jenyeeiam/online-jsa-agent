class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :authenticate_coach, :authenticate_player

  def authenticate_coach(token)
    decoded_token = JWT.decode token, Rails.application.secrets[:hmac_secret], true, { :algorithm => 'HS256' }
    email = decoded_token.first['data']
    Coach.find_by(email: email)
  end

  def authenticate_player(token)
    decoded_token = JWT.decode token, Rails.application.secrets[:hmac_secret], true, { :algorithm => 'HS256' }
    email = decoded_token.first['data']
    Player.find_by(email: email)
  end
end
