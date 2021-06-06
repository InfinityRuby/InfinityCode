class Quest < ApplicationRecord
  has_many :answers
  has_many :cases
  has_many :prompts
  scope :with_level, ->(data) { where(level: data) if data }

  # scope :open_public, -> { where( :is_public => true ) }
  def self.with_level(data)
    if data
      where(level: data)
    else
      all
    end
  end
end
