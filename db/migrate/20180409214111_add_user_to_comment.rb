class AddUserToComment < ActiveRecord::Migration[5.1]
  def change
    add_reference :comments, :user, foreign_key: true
    remove_column :comments, :by, :string
    remove_column :comments, :time, :datetime
  end
end
