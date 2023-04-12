class Api::CommentsController < ApplicationController 
    def listcomments
        @comments = Comment.where("post_id = #{params[:id]}")
        render 'api/comment/listcomments'
    end

    def show
        @comment = Comment.find(params[:id])
        render 'api/comments/show'
    end
end