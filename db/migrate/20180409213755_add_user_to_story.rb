class AddUserToStory < ActiveRecord::Migration[5.1]
  def change
    add_reference :stories, :user, foreign_key: true
    remove_column :stories, :time
    remove_column :stories, :by
  end
end
