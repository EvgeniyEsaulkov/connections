Rails.application.routes.draw do
  default_url_options host: ENV["DEFAULT_URL"]

  post "/graphql", to: "graphql#execute"
  root "home#index"

  get "/*path", to: "home#index"
end
