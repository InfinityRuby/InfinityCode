class Quest < ApplicationRecord
  has_many :answers
  has_many :cases
  has_many :prompts
  scope :with_level, ->(data) { where(level: data) if data }
end
