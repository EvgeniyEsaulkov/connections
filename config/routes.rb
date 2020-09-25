Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  root "home#index"

  get "/*path", to: "home#index"

  devise_for :users, skip: :all
end
