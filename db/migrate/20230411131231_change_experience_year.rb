class ChangeExperienceYear < ActiveRecord::Migration[7.0]
  def change
    change_column :experiences, :start_year, :integer, default: 0, using: 'start_year::integer'
    change_column :experiences, :end_year, :integer, default: 0, using: 'end_year::integer'
    change_column :experiences, :start_month, :string, default: 0
    change_column :experiences, :end_month, :string, default: 0
  end
end
