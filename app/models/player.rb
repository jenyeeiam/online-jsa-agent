class Player < ApplicationRecord
  has_many :messages
  has_many :videos
  validates :email, uniqueness: true
  has_secure_password

  private
  def find_coach(email)
    Coach.find_by(email: email)
  end
end
