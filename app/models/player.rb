class Player < ApplicationRecord
  include GenerateXml
  has_many :messages
  has_many :videos
  has_many :coaches, through: :messages
  validates :email, uniqueness: true
  has_secure_password

  def translate_accolades(accolades)
    begin
      res = RestClient.post("https://api.microsofttranslator.com/V2/Http.svc/TranslateArray", generate_xml('ja', 'en', accolades), headers={'Ocp-Apim-Subscription-Key': Rails.application.secrets['jsa_key'], 'Content-Type': 'application/xml'})
      if res.code == 200
        parsed_response = Nokogiri::HTML(res.body)
        translation = parsed_response.children[1].children.first.children.first.children.first.children[2].children.text
      else
        translation = 'Failed Translation'
      end
      update_attributes({japanese_accolades: translation})
    rescue RestClient::ExceptionWithResponse => e
      puts e.response
    end
  end

  private
  def find_coach(email)
    Coach.find_by(email: email)
  end
end
