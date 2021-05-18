Rails.application.routes.draw do

  resources :tests
  resources :posts


  root 'posts#index'
  resources :demos

end
