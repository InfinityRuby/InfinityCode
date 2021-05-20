Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users
  resources :posts
  resources :quests 
  
  get "/jsons/data", to: "jsons#data"
  get "/quests/questdata", to: "quests#questdata"

  namespace :api do
    namespace :v1 do
      resources :quests do
        resources :prompts, only: [:index, :show]
        
      end
    end
  end

  root to: "users#index" #devise 用，之後有必要再換名稱

end
