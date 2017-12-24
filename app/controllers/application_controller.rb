class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :authenticate_coach

  def authenticate_coach(token)
    decoded_token = JWT.decode token, nil, false
    email = decoded_token.first['data']
    Coach.find_by(email: email)
  end
end
