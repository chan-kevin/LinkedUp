@users.each do |user|
    json.set! user.id do
        json.photoUrl user.photo.url
        json.extract! user, :id, :first_name, :last_name, :headline
    end
end