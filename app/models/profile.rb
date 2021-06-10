class Profile < ApplicationRecord
  belongs_to :user
  mount_uploader :avatar, ImageUploader

  after_create :make_user_profile_default

  def make_user_profile_default
    self.name = user.email.split('@', -1).first
    self.bio = ''
    self.save
  end
  
end
