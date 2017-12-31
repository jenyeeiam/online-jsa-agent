class PlayersController < ApplicationController
  include GenerateXml
  def index
    auth_token = request.headers['token']
    if auth_token != 'null' && authenticate_coach(auth_token)
      render json: Player.order(id: :desc)
    else
      render json: {error: "Not Authenticated"}
    end
  end

  def create
    player = Player.new player_params
    if player.save
      # translate the accolades
      begin
        res = RestClient.post("https://api.microsofttranslator.com/V2/Http.svc/TranslateArray", generate_xml('ja', 'en', params[:accolades]), headers={'Ocp-Apim-Subscription-Key': Rails.application.secrets['jsa_key'], 'Content-Type': 'application/xml'})
        if res.code == 200
          parsed_response = Nokogiri::HTML(res.body)
          translation = parsed_response.children[1].children.first.children.first.children.first.children[2].children.text
        else
          translation = 'Failed Translation'
        end
        Player.last.update_attributes({japanese_accolades: translation})
      rescue RestClient::ExceptionWithResponse => e
        puts e.response
      end
      payload = {data: player.email}
      token = JWT.encode payload, nil, 'none'
      render json: {token: token}
    else
      render json: {error: 'couldnt save'}
    end
  end

  def login
    if Player.find_by(email: params[:email]).try(:authenticate, params[:password])
      payload = {data: params[:email]}
      token = JWT.encode payload, nil, 'none'
      render json: {token: token}
    else
      render json: {error: 'Incorrect email or password'}
    end
  end

  private
  def player_params
    params.permit(:name, :position, :bats, :throws, :email, :alma_mater, :accolades, :batting_avg, :era, :password)
  end

end
