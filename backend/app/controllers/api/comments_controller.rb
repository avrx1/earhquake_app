class Api::CommentsController < ApplicationController
    def index
        
        @comments = Comment.where(feature_id: params[:feature_external_id])
      

        render  json: @comments.to_json
    end

    def create
        comment = Comment.new(user_params)
        if comment.save
            render json: comment, status: :created
          else
            render json: comment.errors, status: :unprocessable_entity
          end
    end
    def user_params
        params.require(:comment).permit(:feature_id, :body)
        
    end
end
