class PlayersController < ApplicationController
  def index
    auth_token = request.headers['token']
    if auth_token != 'null' && authenticate_coach(auth_token)
      render json: Player.all
    else
      render json: {error: "Not Authenticated"}
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
