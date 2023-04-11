class ChangeNullYear < ActiveRecord::Migration[7.0]
  def change
    change_column :experiences, :start_year, :integer, null: true, default: nil, using: 'start_year::integer'
    change_column :experiences, :end_year, :integer, null: true, default: nil, using: 'end_year::integer'
    change_column :experiences, :start_month, :string, null: true, default: nil
    change_column :experiences, :end_month, :string, null: true, default: nil
  end
end
