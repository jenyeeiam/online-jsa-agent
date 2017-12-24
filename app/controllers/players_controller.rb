class PlayersController < ApplicationController
  def index
    auth_token = request.headers['token']
    if authenticate_coach auth_token
      render json: Player.all
    end
  end
end
