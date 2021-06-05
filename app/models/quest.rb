class Quest < ApplicationRecord
  has_many :answers
  has_many :cases
  has_many :prompts
end
