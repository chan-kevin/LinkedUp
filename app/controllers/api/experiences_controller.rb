class Api::ExperiencesController < ApplicationController
  before_action :require_logged_in

    def create
        @experience = Experience.new(experience_params)
        if @experience.save
          render :show
        else
          render json: @experience.errors.full_messages, status: :unprocessable_entity
        end
      end

    def update
        @experience = Experience.find(params[:id])

        if @experience.update(experience_params)
            render :show
        else
            render json: @experience.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @experience = Experience.find(params[:id])

        @experience.destroy
        render :show
    end

    private

    def experience_params
        params.require(:experience).permit(:title, :company, :location, :logo, :current, :description, :start_month, :start_year, :end_month, :end_year, :user_id)
    end
end