# json.user do
#     json.set! current_user.id do
#         json.extract! current_user, :id, :first_name, :last_name, :about
#     end
# end

# json.post do
#     current_user.posts.each do |post|
#         json.set! post.id do
#             json.extract! post, :id, :body, :author_id
#         end
#     end
# end

json.post do
    json.set! @post.id do 
        json.extract! @post, :id, :body, :author_id
    end
end

json.comments do 
    @post.comments.each do |comment|
        json.set! comment.id do
            json.commenter_first_name comment.commenter.first_name
            json.commenter_last_name comment.commenter.last_name
            json.commenter_headline comment.commenter.headline
            json.commenter_photo comment.commenter.photo.attached? ? comment.commenter.photo.url : nil
            json.extract! comment, :id, :body, :commenter_id, :post_id
        end
    end
end