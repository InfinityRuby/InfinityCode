Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :posts do
    resources :comments
  end
  
  resources :quests 
  resource :profile, only: [:show, :edit, :update]
  
  get "/quests/questdata", to: "quests#questdata"

  # API 路徑設定
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :quests, except: [:new, :edit] do
        resources :prompts, shallow: true, only: [:index, :show]
          collection do 
            get :easy
            get :medium
            get :hard
          end
          member do
            post :answer
          end
      end

      resources :posts, except: [:new, :edit] do
        resources :comments, shallow: true, except: [:new, :edit]

        member do
          get :user
        end
      end
      
      resources :coins, only: [:index, :create]
      resources :users, only: [:index] do
        member do
          get:completed_ratio
        end
      end
    end
  end

  root to: "homes#index"
end
