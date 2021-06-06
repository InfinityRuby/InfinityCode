class Comment < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :post
  belongs_to :user

  default_scope { order(id: :desc) }
end
