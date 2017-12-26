class MessagesController < ApplicationController
  def check_user_type(token)
    authenticate_coach(token) || authenticate_player(token)
  end

  def index
    user = check_user_type params[:auth_token]
    if user.is_a? Coach
      render json: user.messages.order(id: :desc)
    else
      render json: user.messages.order(id: :desc)
    end
  end

  def create
    user = check_user_type params[:auth_token]
    if user.is_a? Coach
      message = Message.new(coach_id: user.id, player_id: params[:player_id], text: params[:message_text], sender: 'coach')
    else
      message = Message.new(coach_id: params[:coach_id], player_id: user.id, text: params[:message_text], sender: 'player')
    end 
    if message.save
      render json: {success: 'Success!'}
    else
      render json: {error: 'Failed to save'}
    end
  end
end
