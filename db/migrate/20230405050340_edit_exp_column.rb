class EditExpColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :experiences, :start_date
    remove_column :experiences, :end_date
    add_column :experiences, :start_month, :string, null: false
    add_column :experiences, :start_year, :string, null: false
    add_column :experiences, :end_month, :string
    add_column :experiences, :end_year, :string
  end
end
