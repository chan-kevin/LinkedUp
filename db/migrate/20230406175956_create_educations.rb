class CreateEducations < ActiveRecord::Migration[7.0]
  def change
    create_table :educations do |t|
      t.string :school, null: false
      t.string :degree
      t.string :start_month
      t.string :start_year
      t.string :end_month
      t.string :end_year
      t.timestamps
    end
  end
end
