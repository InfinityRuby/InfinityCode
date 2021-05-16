Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :users

  root to: "users#index" #devise 用，之後有必要再換名稱
end
