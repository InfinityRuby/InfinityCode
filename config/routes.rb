Rails.application.routes.draw do
  resources :quests 

  get "/quests/questdata", to: "quests#questdata"

end
