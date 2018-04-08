class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.string :by
      t.datetime :time
      t.string :url
      t.string :title
      t.text :text

      t.timestamps
    end
  end
end
