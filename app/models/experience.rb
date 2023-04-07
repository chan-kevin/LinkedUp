# == Schema Information
#
# Table name: experiences
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  company     :string           not null
#  location    :string
#  description :text
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  start_month :string           not null
#  start_year  :string           not null
#  end_month   :string
#  end_year    :string
#
class Experience < ApplicationRecord
  validates :title, :company, :start_month, :start_year, :user_id, presence: true
  
  belongs_to :user
end
