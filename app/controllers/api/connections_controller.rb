class Api::ConnectionsController < ApplicationController

    def create
        @connection = Connection.new(connection_params)

        if @connection.save
            render :show
        else
            render json: @experience.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @connection = Connection.find_by(connecter_id: current_user.id, connectee_id: params[:id])
        
        if @connection.destroy
            render :show
        end
    end

    private

    def connection_params
        params.require(:connection).permit(:connecter_id, :connectee_id)
    end
end