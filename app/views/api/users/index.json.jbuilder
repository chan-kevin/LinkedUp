json.array! @users do |user|
    json.extract! user, :id, :email, :first_name, :last_name, :headline
    json.photoUrl user.photo.attached? ? user.photo.url : nil
end