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
#  start_year  :integer          not null
#  end_month   :string
#  end_year    :integer
#  skills      :string
#  logo        :text
#  current     :boolean          default(FALSE), not null
#

require 'date'

class Experience < ApplicationRecord
  validates :title, :company, :start_month, :start_year, :user_id, presence: true
  validates :end_month, :end_year, presence: true, unless: -> { current }
  validate :start_end_dates, if: -> { all_present? && !current }
  
  belongs_to :user

  def all_present?
    [title, company, start_month, start_year, user_id, end_month, end_year].all?(&:present?)
  end
  
  def start_end_dates
    current_time = Date.today
    end_date = Date.new(end_year.to_i, Date::MONTHNAMES.index(end_month), 1)
    start_date = Date.new(start_year.to_i, Date::MONTHNAMES.index(start_month), 1)

    if end_date.year > current_time.year || start_date.year > current_time.year
      errors.add :start_year, "or end date cannot be in the future"
    elsif end_date.year == current_time.year && end_date.month > current_time.month ||
          start_date.year == current_time.year && start_date.month > current_time.month
      errors.add :start_year, "or end date cannot be in the future"
    elsif end_date < start_date
      errors.add :end_year, "must be after start date"
    end
  end

  def description
    read_attribute(:description)&.gsub("\r\n", "\n")
  end

  def description=(value)
    super(value&.gsub("\n", "\r\n"))
  end
  
end
