json.comment do 
    json.commenter_first_name @comment.commenter.first_name
    json.commenter_last_name @comment.commenter.last_name
    json.commenter_headline @comment.commenter.headline
    json.commenter_photo @comment.commenter.photo.attached? ? @comment.commenter.photo.url : nil
    json.extract! @comment, :id, :body, :commenter_id, :post_id
end