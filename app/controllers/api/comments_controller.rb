class Api::CommentsController < ApplicationController 
    def listcomments
        @comments = Comment.where("post_id = #{params[:id]}")
        render 'api/comment/listcomments'
    end

    def show
        @comment = Comment.find(params[:id])
        render 'api/comments/show'
    end

    def create 
        @comment = Comment.new(comment_params)
        @comment.commenter_id = current_user.id
        
        if @comment.save 
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end

end