class Api::PostsController < ApplicationController 
    before_action :require_logged_in

    def index 
        @posts = Post.includes(:author, :comments, :likes).all.order(created_at: :desc)
        render '/api/posts/index'
    end

    def show
        @post = Post.find(params[:id])
        render '/api/posts/show'
    end

    def create 
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        
        if @post.save 
            render json: '/api/posts/show'
        else
            render json: @post.errors.full_messages, status: 422
        end
    end
    
    def update  
        @post = Post.find(params[:id])
        if @post.update(post_params)
            render '/api/posts/show'
            # render json: @post
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def destroy 
        @post = Post.find(params[:id])
        
        @post.destroy
        render :show
    end

    private 
    def post_params 
        params.require(:post).permit(:id, :user_id, :body, :author_id)
    end
end