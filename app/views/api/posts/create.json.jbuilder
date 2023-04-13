json.post do
    json.set! @post.id do 
        json.extract! @post, :id, :body, :author_id
    end
end