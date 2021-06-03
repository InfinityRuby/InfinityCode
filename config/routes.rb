Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :posts do
    resources :comments
  end
  
  resources :quests 
  resource :profile, only: [:show, :edit, :update]
  
  get "/jsons/data", to: "jsons#data"
  get "/jsons/posts_comments/:id", to: "jsons#posts_comments"
  get "/quests/questdata", to: "quests#questdata"

  # API 路徑設定
  namespace :api do
    namespace :v1 do
      resources :quests, except: [:new, :edit] do
        resources :prompts, only: [:index, :show]
        
        member do
          post :answer
        end
      end

      resources :posts, except: [:new, :edit] do
        member do
          get "like", to: "posts#user_like"
          get "totallike", to: "posts#total_votes"
        end
        resources :comments, shallow: true, except: [:new, :edit]
        member do
          get :user
          get "like", to: "comments#upvote"
        end
      end 

    end
  end

  root to: "homes#index"

end
