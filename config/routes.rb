Rails.application.routes.draw do

  devise_for :users
  resources :posts


  root 'posts#index'

  get "/jsons/data", to: "jsons#data"
end
