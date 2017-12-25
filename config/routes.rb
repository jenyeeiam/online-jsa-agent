Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  resources :players, only: [:index, :create]
  resources :coaches, only: [:create]
  resources :messages, only: [:create, :show]

  get '*path', to: 'home#index'
end
