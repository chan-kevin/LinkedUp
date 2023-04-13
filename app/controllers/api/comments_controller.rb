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
        @post = Post.includes(:comments).find(comment_params[:post_id])
        @comments = @post.comments.order(created_at: :desc)
        
        if @comment.save 
            render 'api/posts/show'
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update  
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            render :show
            # render json: @post
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy 
        @comment = Comment.find(params[:id])
        
        @comment.destroy
        render :show
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end

end