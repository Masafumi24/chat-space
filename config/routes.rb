Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create]
  resources :groups, only: [:index, :new, :create, :edit, :update]
end
