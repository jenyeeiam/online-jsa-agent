class Message < ApplicationRecord
  belongs_to :coach
  belongs_to :player
end
