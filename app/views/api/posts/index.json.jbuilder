json.posts do 
    json.extract! @posts, :id, :body, :author_id
end