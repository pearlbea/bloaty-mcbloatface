class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.integer :karma, null: false, default: 0
      t.text :about

      t.timestamps
    end
  end
end
