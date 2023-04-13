json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.author_first_name post.author.first_name
            json.author_last_name post.author.last_name
            json.author_headline post.author.headline
            json.author_photo post.author.photo.attached? ? post.author.photo.url : nil
            json.likes_count post.likes.length
            json.comments post.comments.select(:id).map{|comment| comment.id}
            json.photoUrl post.photo.url
            json.extract! post, :id, :body, :author_id
        end
    end
    json.postIds @posts.map {|post| post.id}
end

json.comments do
    @posts.each do |post|
        post.comments.each do |comment|
            json.set! comment.id do
                json.extract! comment, :id, :body, :commenter_id
            end
        end
    end
end