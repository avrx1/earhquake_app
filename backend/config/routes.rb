Rails.application.routes.draw do

  namespace :api do
    resources :features, param: :external_id do
      resources :comments
    end
  end


  

  
  
  
end
