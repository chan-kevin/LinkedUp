class Api::EducationsController < ApplicationController

    def create
        @education = Education.new(education_params)

        if @education.save
            render :show
        else
            render json: @education.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        @education = Education.find(params[:id])

        if @education.update(education_params)
            render :show
        else
            render json: @education.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @education = Education.find(params[:id])

        @education.destroy
        render :show
    end

    private

    def education_params
        params.require(:education).permit(:school, :degree, :start_month, :start_year, :end_month, :end_year, :user_id)
    end
end