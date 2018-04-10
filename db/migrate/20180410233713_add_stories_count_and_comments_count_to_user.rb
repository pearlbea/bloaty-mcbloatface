class AddStoriesCountAndCommentsCountToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :stories_count, :integer, null: false, default: 0
    add_column :users, :comments_count, :integer, null: false, default: 0
  end
end
