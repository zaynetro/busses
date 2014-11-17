class CreateStops < ActiveRecord::Migration

  def change
    create_table :stops, :primary_key => :num do |t|
      t.string :name
      t.integer :api_id
      t.integer :x
      t.integer :y

      t.timestamps
    end
    change_column :stops, :num, :string
    add_index :stops, :num, unique: true
  end

  def down
    drop_table :stops
    remove_index :stops, :num
  end

end
