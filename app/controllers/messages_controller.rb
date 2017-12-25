class MessagesController < ApplicationController
  def create
    coach = authenticate_coach params[:auth_token]
    message = Message.new(coach_id: coach.id, player_id: params[:player_id], text: params[:message_text])
    if message.save
      render json: {success: 'Success!'}
    # else
      # render json: {error: 'Failed to save'}
    end
  end

  def show

  end

end
