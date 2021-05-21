Rails.application.routes.draw do

  resources :tests
  resources :posts

  resources :demos

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users
  
  get "/jsons/data", to: "jsons#data"

  root to: "users#index" #devise 用，之後有必要再換名稱

end
