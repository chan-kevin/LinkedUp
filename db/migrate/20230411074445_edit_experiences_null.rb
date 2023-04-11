class EditExperiencesNull < ActiveRecord::Migration[7.0]
  def change
    change_column :experiences, :end_month, :string, null: false
    change_column :experiences, :end_year, :string, null: false
    add_column :experiences, :current, :boolean, default: true, null: false
  end
end
