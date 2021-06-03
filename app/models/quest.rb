class Quest < ApplicationRecord
  has_many :answers
  has_many :cases
end
