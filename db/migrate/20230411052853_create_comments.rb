class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.references :post, null: false
      t.references :commenter, null: false, foreign_key: { to_table: :users}
      t.timestamps
    end
    # add_index :comments, :commenter_id
    # add_index :comments, :post_id
  end
end
