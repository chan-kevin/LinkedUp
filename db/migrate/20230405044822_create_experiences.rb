class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.string :title, null: false
      t.string :company, null: false
      t.string :location
      t.date :start_date, null: false
      t.date :end_date
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
