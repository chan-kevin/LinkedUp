# json.connection do
#     json.extract! @connection, :id, :connectee_id, :connecter_id
# end

json.connection do
    @connection.connectee.connected_users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :first_name, :last_name, :location
        end
    end
end