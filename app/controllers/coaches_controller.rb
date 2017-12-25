class CoachesController < ApplicationController
  def create
    if params
      c = Coach.new coach_params
      if c.save
        payload = {data: c.email}
        token = JWT.encode payload, nil, 'none'
        render json: {token: token}
      else
        render json: {error: 'couldnt save'}
      end
    else
      render json: {error: 'no params'}
    end
  end

  def login
    if params
      
    end
  end

  private
  def coach_params
    params.permit(:team, :email, :password)
  end

  def login_params
    params.permit(:email, :password)
  end
end
