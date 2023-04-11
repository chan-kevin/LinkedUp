json.user do
    json.set! current_user.id do
        json.extract! current_user, :id, :first_name, :last_name, :about
    end
end

json.post do
    current_user.posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :author_id
        end
    end
end