Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index, :update] do
      collection do
        get :search
      end
    end
    resources :connections, only: [:create, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resource :education, only: [:show, :create, :destroy]
    resources :experiences, only: [:create, :update, :destroy]
  end
  
  get '*path', to: "static_pages#frontend_index"
end
