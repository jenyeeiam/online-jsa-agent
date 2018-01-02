class VideosController < ApplicationController
  def index
    render json: Video.where(player_id: params[:player_id])
  end
end
