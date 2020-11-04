Rails.application.routes.draw do
  default_url_options host: ENV["DEFAULT_URL"]

  post "/graphql", to: "graphql#execute"
  root "home#index"

  devise_for :users,
             controllers: {
               confirmations: "auth/confirmations",
               passwords: "auth/passwords"
             },
             skip: :registrations # skip registration route

  get "/*path", to: "home#index"
end
