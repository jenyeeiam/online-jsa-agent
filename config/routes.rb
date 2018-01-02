Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  resources :players, only: [:index, :create]
  resources :coaches, only: [:create]
  resources :messages, only: [:index, :create]
  resources :videos, only: [:index]

  post '/coaches/login', to: 'coaches#login'
  post '/players/login', to: 'players#login'
  post '/login', to: 'sessions#login'

  get '*path', to: 'home#index'
end
