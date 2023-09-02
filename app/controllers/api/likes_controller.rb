class Api::LikesController < ApplicationController 

    def create
        @like = Like.new(like_params)
        @posts = Post.includes(:author, :comments, :likes).all.order(created_at: :desc)

        if @like.save
            render 'api/posts/index'
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy 
        @like = Like.find_by({likeable_id: params[:id], liker_id: current_user.id})
        @like.destroy
        @post = Post.find(params[:id])
        @comments = @post.comments.order(created_at: :desc)
        render 'api/posts/show'

    end

    private

    def like_params
        params.require(:like).permit(:liker_id, :likeable_id)
    end
end