class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.references :connecter, null: false
      t.references :connectee, null: false
      t.timestamps
    end
    add_index :connections, [:connecter_id, :connectee_id], unique: true
  end
end
