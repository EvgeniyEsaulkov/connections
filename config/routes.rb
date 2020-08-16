Rails.application.routes.draw do
  root "home#index"

  namespace :api do
    namespace :v1 do
      get "events/index"
      post "events/create"
      get "/show/:id", to: "events#show"
      delete "/destroy/:id", to: "events#destroy"
    end
  end

  get "/*path", to: "home#index"
end
