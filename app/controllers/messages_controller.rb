class MessagesController < ApplicationController
  def index
    coach = authenticate_coach params[:auth_token]
    all_messages = coach.messages.order(id: :desc)
    player_ids = all_messages.pluck(:player_id).uniq
    data = {}
    player_ids.each do |id|
      data[id] = all_messages.select{|m| m.player_id == id}
    end
    # render json: data
    render json: coach.messages.order(id: :desc)
  end

  def create
    coach = authenticate_coach params[:auth_token]
    message = Message.new(coach_id: coach.id, player_id: params[:player_id], text: params[:message_text], sender: 'coach')
    if message.save
      render json: {success: 'Success!'}
    else
      render json: {error: 'Failed to save'}
    end
  end
end
