Rails.application.routes.draw do
  resources :tests
  resources :posts


  root 'posts#index'

  get "/jsons/data", to: "jsons#data"
end
