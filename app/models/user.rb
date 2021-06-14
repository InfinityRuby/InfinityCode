class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :omniauthable, omniauth_providers: [:facebook, :google_oauth2, :github]
  has_many :posts
  has_many :comments
  has_many :coins
  has_one :profile, dependent: :destroy
  has_many :answers
  has_many :quests, through: :answers
  acts_as_voter
  has_many :achievements
  has_many :badges, through: :achievements

  after_create do
    create_profile
  end

  after_commit do
    check_user_achievement
    check_coins_achievement
  end

  before_create do
    set_default_value
  end


  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
    user.email = provider_data.info.email
    user.password = Devise.friendly_token[0, 20]
    end
  end

  private
  def set_default_value
    self.coin_amount = 20
  end

  # 檢查成就 - 註冊天數
  def check_user_achievement
    last_sign_in = self.last_sign_in_at
    created_at = self.created_at

    if (last_sign_in != nil and created_at != nil)
      diff_day = (last_sign_in.to_date - created_at.to_date).to_i

      case diff_day
      when 10
        badge_id = 13
      when 50
        badge_id = 14
      when 100
        badge_id = 15
      when 500
        badge_id = 16
      end
    end

    @user = User.find(self.id)

    create_achievement(badge_id)
  end

  # 檢查成就 - 金幣數量 & 排行榜金幣數量第一
  def check_coins_achievement
    if (self.coin_amount != nil)

      @user = User.find(self.id)

      case
      when (self.coin_amount >= 10 and self.coin_amount < 50)
        badge_id = 9
      when (self.coin_amount >= 50 and self.coin_amount < 100)
        badge_id = 10
      when (self.coin_amount >= 100 and self.coin_amount < 500)
        badge_id = 11
      when (self.coin_amount >= 500)
        badge_id = 12
      end

      create_achievement(badge_id)

      first_user = User.order(coin_amount: :desc).first

      if (first_user.id == self.id)
        badge_id = 19

        create_achievement(badge_id)
      end

    end

  end

  # 檢查成就 - 排行榜 - 金幣
end