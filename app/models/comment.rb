# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  body         :string           not null
#  post_id      :bigint           not null
#  commenter_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Comment < ApplicationRecord
    validates :commenter_id, :body, presence: true

    belongs_to :post

    belongs_to :commenter, class_name: :User
end
