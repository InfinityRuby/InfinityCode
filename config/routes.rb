Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users
  resources :posts do
    resources :comments
  end
  
  get "/jsons/data", to: "jsons#data"

  root to: "users#index" #devise 用，之後有必要再換名稱

end
