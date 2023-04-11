class ChangeDefault < ActiveRecord::Migration[7.0]
  def change
    change_column_default :experiences, :current, from: true, to: false
  end
end
