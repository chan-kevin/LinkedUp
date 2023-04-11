# == Schema Information
#
# Table name: likes
#
#  id          :bigint           not null, primary key
#  liker_id    :bigint           not null
#  likeable_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Like < ApplicationRecord
    validates :liker_id, :likeable_id, presence: true

    belongs_to :liker,
        foreign_key: :liker_id,
        class_name: :User
    
    belongs_to :post,
        foreign_key: :likeable_id,
        class_name: :Post
end
