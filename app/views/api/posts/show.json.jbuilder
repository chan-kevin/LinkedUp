json.post do
    json.set! @post.id do 
        json.author_first_name @post.author.first_name
        json.author_last_name @post.author.last_name
        json.author_headline @post.author.headline
        json.author_photo @post.author.photo.attached? ? @post.author.photo.url : nil
        json.likes_count @post.likes.length
        json.likesIds @post.likes.map {|like| like.liker_id}
        json.liked @post.is_liked(current_user.id)
        json.comments @post.comments.select(:id).map{|comment| comment.id}
        json.photoUrl @post.photo.url
        json.extract! @post, :id, :body, :author_id
    end
end

json.comments do 
    if @comments
      @comments.each do |comment|
        json.set! comment.id do
          json.commenter_first_name comment.commenter.first_name
          json.commenter_last_name comment.commenter.last_name
          json.commenter_headline comment.commenter.headline
          json.commenter_photo comment.commenter.photo.attached? ? comment.commenter.photo.url : nil
          json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at
        end
      end
      json.commentIds @comments.map { |comment| comment.id }
    else
      json.array! []
    end
end