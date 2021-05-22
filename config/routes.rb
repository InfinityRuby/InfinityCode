Rails.application.routes.draw do

  resources :tests
  resources :demos

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users
  resources :posts do
    resources :comments
  end
  resources :quests 
  resources :demos
  resource :profile
  
  get "/jsons/data", to: "jsons#data"
  get "/quests/questdata", to: "quests#questdata"

  # API 路徑設定
  namespace :api do
    namespace :v1 do
      resources :quests, except: [:new, :edit] do
        resources :prompts, only: [:index, :show]

      end
    end
  end


  root to: "users#index" #devise 用，之後有必要再換名稱

end
