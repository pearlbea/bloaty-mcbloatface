class RenameCommentCountToCommentsCountInStory < ActiveRecord::Migration[5.1]
  def change
    rename_column :stories, :comment_count, :comments_count
  end
end
