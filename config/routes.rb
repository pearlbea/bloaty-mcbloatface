Rails.application.routes.draw do
  root to: 'stories#index'
  resources :todos
  resources :stories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
