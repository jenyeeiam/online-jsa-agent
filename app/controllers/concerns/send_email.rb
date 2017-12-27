require 'active_support/concern'
require 'sendgrid-ruby'

module SendEmail
  extend ActiveSupport::Concern
  include SendGrid
  def send_email(recipient, sender, text)
    from = Email.new(email: 'no-reply@nippon-softball.com')
    to = Email.new(email: recipient.email)
    subject = "You've recieved a message from #{sender.class.to_s} #{sender.id}"
    content = Content.new(type: 'text/plain', value: text)
    mail = Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: Rails.application.secrets['sendgrid_api_key'])
    response = sg.client.mail._('send').post(request_body: mail.to_json)
    puts response.status_code
    puts response.body
    puts response.headers
  end

end
