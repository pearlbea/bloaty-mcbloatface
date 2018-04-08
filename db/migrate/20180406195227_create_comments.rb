class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.belongs_to :story, index: true
      t.belongs_to :comment, index: true, null: true
      t.string :by
      t.datetime :time
      t.text :text
      t.string :url
      t.string :title
      t.timestamps
    end
  end
end
