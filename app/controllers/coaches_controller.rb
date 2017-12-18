class CoachesController < ApplicationController
  def create
    if params
      c = Coach.new
      c.email = params[:email]
      c.team = params[:team]
      c.save
      render json: {error: nil}
    else
      render json: {error: 'no params'}
    end

  end
end
