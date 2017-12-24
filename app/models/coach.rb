class Coach < ApplicationRecord
  has_many :messages

  validates :email, uniqueness: true
  has_secure_password

end
