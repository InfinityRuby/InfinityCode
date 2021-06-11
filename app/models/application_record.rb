class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  private
  def find_user
    @user = User.find(self.user_id)
  end

  def create_achievement(badge_id)
    if !badge_id.nil?
      achievement_existed = @user.achievements.where(badge_id: badge_id).count > 0

      if (!achievement_existed)
        @user.achievements.create(badge_id: badge_id)
      end
    end
  end
end
