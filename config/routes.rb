Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  resources :players, only: [:index, :create, :update, :edit]
  resources :coaches, only: [:create]
  resources :messages, only: [:index, :create]
  resources :videos, only: [:index]

  post '/login', to: 'sessions#login'

  get '*path', to: 'home#index'
end
