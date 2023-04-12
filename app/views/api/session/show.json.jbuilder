json.user do
    json.extract! @user, :id, :email, :phone_number, :first_name, :last_name, :about, :location, :headline
    json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end