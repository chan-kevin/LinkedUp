class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :liker, null: false, foreign_key: { to_table: :users}
      t.references :likeable, null: false, foreign_key: { to_table: :posts}
      t.timestamps
    end
    # add_index :likes, :liker_id
    # add_index :likes, :likeable_id
  end
end
