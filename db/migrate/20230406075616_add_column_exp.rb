class AddColumnExp < ActiveRecord::Migration[7.0]
  def change
    add_column :experiences, :skills, :string
    add_column :experiences, :logo, :text
  end
end
