class AddUserIdEducation < ActiveRecord::Migration[7.0]
  def change
    add_reference :educations, :user, foreign_key: true
  end
end
