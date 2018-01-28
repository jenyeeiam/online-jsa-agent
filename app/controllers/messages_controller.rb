class MessagesController < ApplicationController
  include GenerateXml
  include SendEmail

  def check_user_type(token)
    authenticate_coach(token) || authenticate_player(token)
  end

  def index
    user = check_user_type request.headers['token']
    puts user.inspect
    if user
      # render json: user.messages.order(id: :desc)
      if user.class.to_s == 'Player'
        render json: user.messages.order(id: :desc)
      else
        coach = Coach.includes(:messages, :players).where(id: user.id)
        render json: {messages: coach.first.messages.order(id: :desc), players: coach.first.players.distinct(:id)}
      end
    else
      render json: {:error => "Please sign in again"}
    end
  end

  def create
    user = check_user_type params[:auth_token]
    if user.is_a? Coach
      begin
        res = RestClient.post("https://api.microsofttranslator.com/V2/Http.svc/TranslateArray", generate_xml('en', 'ja', params[:message_text]), headers={'Ocp-Apim-Subscription-Key': Rails.application.secrets['jsa_key'], 'Content-Type': 'application/xml'})
        if res.code == 200
          parsed_response = Nokogiri::HTML(res.body)
          translation = parsed_response.children[1].children.first.children.first.children.first.children[2].children.text
        else
          translation = 'Failed Translation'
        end
      rescue RestClient::ExceptionWithResponse => e
        puts e.response
      end
      # send notification email to player
      send_email(Player.find(params[:player_id]), user, translation)
      message = Message.new(coach_id: user.id, player_id: params[:player_id], japanese_text: params[:message_text], text: translation, sender: 'coach')
    else
      # assuming english to japanese
      begin
        res = RestClient.post("https://api.microsofttranslator.com/V2/Http.svc/TranslateArray", generate_xml('ja', 'en', params[:message_text]), headers={'Ocp-Apim-Subscription-Key': Rails.application.secrets['jsa_key'], 'Content-Type': 'application/xml'})
        if res.code == 200
          parsed_response = Nokogiri::HTML(res.body)
          translation = parsed_response.children[1].children.first.children.first.children.first.children[2].children.text
        else
          translation = 'Failed Translation'
        end
      rescue RestClient::ExceptionWithResponse => e
        puts e.response
      end
      # send email to coach
      send_email(Coach.find(params[:coach_id]), user, translation)
      message = Message.new(coach_id: params[:coach_id], player_id: user.id, text: params[:message_text], japanese_text: translation, sender: 'player')
    end
    if message.save
      render json: {success: 'Success!'}
    else
      render json: {error: 'Failed to save'}
    end
  end
end
