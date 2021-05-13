Rails.application.routes.draw do
  devise_for :users
  resources :tests

  root to: "tests#index" #devise 用，之後有必要再換名稱
end
