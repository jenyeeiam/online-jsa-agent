class CoachesController < ApplicationController
  def create
    if params
      c = Coach.new coach_params
      if c.save
        render json: {error: nil}
      else
        render json: {error: 'couldnt save'}
      end
    else
      render json: {error: 'no params'}
    end
  end

  private
  def coach_params
    params.required(:coach).permit(:team, :email, :password)
  end
end
