class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :omniauthable, omniauth_providers: [:facebook, :google_oauth2, :github]
  has_many :posts
  has_many :comments
  has_many :coins
  has_one :profile

  after_create do
    create_profile
    create_coins
  end

  def self.create_from_provider_data(provider_data) 
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
    user.email = provider_data.info.email
    user.password = Devise.friendly_token[0, 20]
    end
  end

  private
  def create_coins
    self.coins.create(coin_amount: 20, coin_change: 0, description: '無')
  end
end
