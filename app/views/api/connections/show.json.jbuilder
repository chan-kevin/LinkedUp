json.connection do
    json.extract! @connection, :id, :connectee_id, :connecter_id
end