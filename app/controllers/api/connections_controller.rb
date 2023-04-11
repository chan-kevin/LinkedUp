class Api::ConnectionsController < ApplicationController
    before_action :require_logged_in

    def create
        @connection = Connection.new(connection_params)
        # @connection = Connection.new(connecter_id: current_user.id, connectee_id: connection_params)
        if @connection.save
            @user = User.find(connection_params[:connectee_id])
            render 'api/users/show'
        else
            render json: @connection.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @connection = current_user.find_connection(params[:id])
        
        if !@connection
            render json: "connections doesn't exist"
        end

        if @connection.destroy
            @user = User.find(params[:id])
            render 'api/users/show'
        else
            render json: @connection.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def connection_params
        params.require(:connection).permit(:connecter_id, :connectee_id)
    end
end