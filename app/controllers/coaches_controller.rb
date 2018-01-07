class CoachesController < ApplicationController
  def create
    if params
      c = Coach.new coach_params
      if c.save
        payload = {data: c.email, exp: Time.now.to_i + 4*3600}
        token = JWT.encode payload, Rails.application.secrets[:hmac_secret], 'HS256'
        render json: {token: token}
      else
        render json: {error: 'couldnt save'}
      end
    else
      render json: {error: 'no params'}
    end
  end

  private
  def coach_params
    params.permit(:team, :email, :password)
  end
end
