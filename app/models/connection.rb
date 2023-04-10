# == Schema Information
#
# Table name: connections
#
#  id           :bigint           not null, primary key
#  connecter_id :bigint           not null
#  connectee_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Connection < ApplicationRecord
    validates :connecter_id, :connectee_id, presence: true
    validates :connecter_id, uniqueness: {scope: :connectee_id}

    belongs_to :connecter, class_name: :User
    belongs_to :connectee, class_name: :User
end
