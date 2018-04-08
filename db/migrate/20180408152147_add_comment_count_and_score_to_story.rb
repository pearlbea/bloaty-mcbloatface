class AddCommentCountAndScoreToStory < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :comment_count, :integer
    add_column :stories, :score, :integer
  end
end
