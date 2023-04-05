json.user do
    json.extract! @user, :id, :email, :phone_number, :first_name, :last_name, :about, :location
end