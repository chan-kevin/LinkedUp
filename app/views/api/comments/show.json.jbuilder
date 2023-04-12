json.comment do
    json.extract! @comment, :id, :body, :commenter_id, :post_id
end