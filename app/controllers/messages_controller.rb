class MessagesController < ApplicationController
  def index
    coach = authenticate_coach params[:auth_token]
    all_messages = coach.messages
    player_ids = all_messages.pluck(:player_id).uniq
    data = {}
    player_ids.each do |id|
      data[id] = all_messages.select{|m| m.player_id == id}
    end
    render json: data
  end

  def create
    coach = authenticate_coach params[:auth_token]
    message = Message.new(coach_id: coach.id, player_id: params[:player_id], text: params[:message_text])
    if message.save
      render json: {success: 'Success!'}
    else
      render json: {error: 'Failed to save'}
    end
  end
end
