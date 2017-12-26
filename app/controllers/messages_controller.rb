class MessagesController < ApplicationController
  include GenerateXml

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
      begin
        japanese = RestClient.post("https://api.microsofttranslator.com/V2/Http.svc/TranslateArray", generate_xml('en', 'ja', params[:message_text]), headers={'Ocp-Apim-Subscription-Key': Rails.application.secrets['jsa_key'], 'Content-Type': 'application/xml'})
        if japanese.code == 200
          parsed_response = Nokogiri::HTML(japanese.body)
          translation = parsed_response.children[1].children.first.children.first.children.first.children[2].children.text
        else
          translation = 'Failed Translation'
        end
      rescue RestClient::ExceptionWithResponse => e
        puts e.response
      end
      message = Message.new(coach_id: user.id, player_id: params[:player_id], text: params[:message_text], japanese_text: translation, sender: 'coach')
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
