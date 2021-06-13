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
          member do
            post :answer
          end
      end

      resources :posts, except: [:new, :edit] do
        member do
          get "islike", to: "posts#is_like?"
          get "like", to: "posts#user_like"
          get "totallike", to: "posts#total_like"
        end
        resources :comments, shallow: true, except: [:new, :edit]
        member do
          get :user
        end
      end
      resources :ranks do
        collection do
          get :coin
          get :post
          get :likes
          get :solved
        end
      end
      resources :problems
      resources :coins, only: [:index, :create]
      resources :users, only: [:index, :update] do
        member do
          get :completed_rate
        end
      end
    end
  end

  root to: "pages#index"
  get '/ranking', to: "pages#ranking"
end
