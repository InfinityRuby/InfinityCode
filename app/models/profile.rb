class Profile < ApplicationRecord
  belongs_to :user
  mount_uploader :avatar, ImageUploader

  after_create :make_user_profile_default
  after_commit :check_profile_achievement

  def make_user_profile_default
    self.name = user.email.split('@', -1).first
    self.bio = ''
    self.save
  end

  private
  # 檢查成就 - 單項成就 - 個人資料
  def check_profile_achievement
    find_user

    # 更改使用者姓名
    if self.name_before_last_save != nil and self.name_before_last_save != self.name
      badge_id = 18
      create_achievement(badge_id)
    end

    # 大頭貼上傳
    avatar = @user.profile.avatar_url

    if avatar != 'default.png'
      badge_id = 20
      create_achievement(badge_id)
    end
  end

end
