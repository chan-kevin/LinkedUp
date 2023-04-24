# require 'httparty'
# require 'dotenv/load'

class Api::ExperiencesController < ApplicationController
  before_action :require_logged_in

    def create
        @experience = Experience.new(experience_params)
        if !(@experience.current)
          # @experience.start_year = @experience.start_year.to_i
          # @experience.end_year = @experience.end_year.to_i
        end
    
        fetch_company_logo(@experience.company)
        @experience.logo = @logo
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

    # def fetch_company_logo(company)
    #     response = HTTParty.get("https://company.clearbit.com/v1/domains/find?name=#{company}",
    #       headers: { Authorization: "Bearer #{ENV['CLEARBIT_API_KEY']}" })
    
    #     data = JSON.parse(response.body)
    #     @logo = data["logo"]
    # end

    def experience_params
        params.require(:experience).permit(:title, :company, :location, :current, :description, :start_month, :start_year, :end_month, :end_year, :user_id)
        # .tap do |params|
          # params[:startYear] = params[:startYear].to_i
          # params[:endYear] = params[:endYear].to_i
        # end
    end
end