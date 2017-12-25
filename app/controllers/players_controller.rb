class PlayersController < ApplicationController
  def index
    auth_token = request.headers['token']
    puts auth_token
    if authenticate_coach auth_token
      render json: Player.all
    end
  end

  def create
    player = Player.new player_params
    if player.save
      payload = {data: player.email}
      token = JWT.encode payload, nil, 'none'
      render json: {token: token}
    else
      render json: {error: 'couldnt save'}
    end
  end

  private
  def player_params
    params.permit(:name, :position, :bats, :throws, :email, :alma_mater, :accolades, :batting_avg, :era, :password)
  end

end
