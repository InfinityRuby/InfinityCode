Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :posts do
    resources :comments,shallow: true
  end

  resources :quests 
  resource :profile, only: [:show, :edit, :update]
  
  get "/postapi/data", to: "post_api#data"
  get "/postapi/comments/:id", to: "post_api#posts_comments"
  get "/quests/questdata", to: "quests#questdata"

  # API 路徑設定
  namespace :api do
    namespace :v1 do
      resources :quests, except: [:new, :edit] do
        resources :prompts, only: [:index, :show]
      end

      resources :posts, except: [:new, :edit] do
        resources :comments, except: [:new, :edit]
      end
      
    end
  end

  root to: "homes#index"

end
