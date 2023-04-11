class AddNullFalseStart < ActiveRecord::Migration[7.0]
  def change
    change_column :experiences, :start_year, :integer, null: false
    change_column :experiences, :start_month, :string, null: false
  end
end
