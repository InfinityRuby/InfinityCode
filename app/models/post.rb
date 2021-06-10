class Post < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :user
  has_many :comments

  default_scope { order(id: :desc) }
end
