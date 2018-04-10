Rails.application.routes.draw do
  root to: 'stories#index'
  resources :users do
    member do
      get :stories
    end
  end
  resources :todos
  resources :stories
end
