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

  after_create do
    create_profile
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
end
