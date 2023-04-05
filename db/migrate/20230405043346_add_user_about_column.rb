class AddUserAboutColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :about, :text
    add_column :users, :location, :string
  end
end
