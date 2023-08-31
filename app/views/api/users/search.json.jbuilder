# json.array!(@users) do |user|
#     json.extract! user, :id, :first_name, :last_name
# end

# json.search do
@users.each do |user|
    json.set! user.id do
        json.photoUrl user.photo.url
        json.extract! user, :id, :first_name, :last_name, :headline
    end
end
# end