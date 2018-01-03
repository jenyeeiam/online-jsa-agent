class Coach < ApplicationRecord
  has_many :messages
  has_many :players, through: :messages
  validates :email, uniqueness: true
  has_secure_password

end
