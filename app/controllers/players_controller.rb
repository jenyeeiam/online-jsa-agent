class PlayersController < ApplicationController
  include GenerateXml
  def index
    auth_token = request.headers['token']
    if auth_token != 'null' && authenticate_coach(auth_token)
      render json: Player.where(deleted: false).order(id: :desc)
    else
      render json: {error: "もう1度ログインして下さい"}
    end
  end

  def edit
    auth_token = request.headers['token']
    player = Player.find(params[:id])
    if auth_token != 'null' && authenticate_player(auth_token)
      if player
        render json: {player: player, videos: player.videos.order(:updated_at).limit(3)}
      else
        render json: {error: "No player found"}
      end
    else
      render json: {error: "Please sign in again"}
    end
  end

  def update
    @player = Player.find(params[:id])
    if @player.update_attributes(update_player_params)
      @player.update_attributes({password: params[:password]}) unless params[:password].length == 0
      @player.translate_accolades(params[:accolades])
      params[:videos].each do |vid|
        unless Video.find_by(url: vid)
          @player.videos.create(url: vid)
        end
      end
    else
      render json: {error: 'Unable to update player'}
    end
    payload = {data: @player.email}
    token = JWT.encode payload, Rails.application.secrets[:hmac_secret], 'HS256'
    render json: {token: token, id: @player.id}
  end

  def create
    @player = Player.new player_params
    @player.deleted = false
    if @player.save
      # save the videos
      if params[:videos].count > 0
        params[:videos].each{ |vid| @player.videos.create(url: vid) }
      end
      # translate the accolades
      @player.translate_accolades(params[:accolades])
      payload = {data: @player.email, exp: Time.now.to_i + 4*3600}
      token = JWT.encode payload, Rails.application.secrets[:hmac_secret], 'HS256'
      render json: {token: token, id: @player.id}
    else
      render json: {error: 'couldnt save'}
    end
  end

  private
  def player_params
    params.permit(:name, :position, :bats, :throws, :email, :alma_mater, :accolades, :batting_avg, :era, :password, :videos)
  end

  def update_player_params
    params.permit(:name, :position, :bats, :throws, :email, :alma_mater, :accolades, :batting_avg, :era, :videos)
  end

end
