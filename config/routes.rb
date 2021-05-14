Rails.application.routes.draw do
  resources :tests
  resources :posts
  # member do
    # post :

  root 'posts#index'
end
