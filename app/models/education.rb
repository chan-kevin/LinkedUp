# == Schema Information
#
# Table name: educations
#
#  id          :bigint           not null, primary key
#  school      :string           not null
#  degree      :string
#  start_month :string
#  start_year  :string
#  end_month   :string
#  end_year    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint
#
class Education < ApplicationRecord
    validates :school, :user_id, presence: true

    has_one_attached :photo

    belongs_to :user
end
