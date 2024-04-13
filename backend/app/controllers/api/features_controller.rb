class Api::FeaturesController < ApplicationController
    def index
        #Default per_page, current_page
        features_per_page = 10
        current_page = 1

        if(params[:per_page].presence)
            features_per_page = params[:per_page].to_i
        end

        if features_per_page > 1000
            render json: '{"error": "Per page outside range"}'
            return
        end
        
        if(params[:page].presence)
            current_page = params[:page].to_i
        end

        mag_type = params[:mag_type].presence
        number_of_pages = ((Feature.all.size + features_per_page - 1) / features_per_page).floor

        if mag_type
            temp_data = Feature.where(mag_type: mag_type)
            number_of_pages = ((temp_data.all.size + features_per_page - 1) / features_per_page).floor
            @data = temp_data
                .limit(features_per_page).offset((current_page-1)*features_per_page)
        else
            @data = Feature.limit(features_per_page).offset((current_page-1)*features_per_page) 
        end
        
        render json: {
            data:@data, 
            pagination: {current_page: current_page, 
            total: number_of_pages, per_page: features_per_page}}.to_json
    end

    def show
       @data = Feature.find_by(external_id: params[:external_id])
       @comments = Comment.where(feature_id: params[:external_id])
      
       render json: {"data":@data, "comments":@comments}.to_json
    end

end
