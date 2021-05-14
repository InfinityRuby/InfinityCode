Rails.application.routes.draw do
  resources : texts, posts

  root 'posts#index'
end
