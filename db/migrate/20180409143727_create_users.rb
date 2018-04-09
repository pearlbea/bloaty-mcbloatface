class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :by
      t.datetime :created
      t.integer :karma
      t.text :about
      t.timestamps
    end
  end
end
