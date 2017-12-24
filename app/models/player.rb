class Player < ApplicationRecord
  has_many :messages
  has_many :videos
  has_secure_password
  
end
