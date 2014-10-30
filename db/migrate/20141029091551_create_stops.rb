class CreateStops < ActiveRecord::Migration

  def change
    create_table :stops, :primary_key => :num do |t|
      t.string :name

      t.timestamps
    end
    change_column :stops, :num, :integer
    add_index :stops, :num, unique: true
  end

  def down
    drop_table :stops
    remove_index :stops, :num
  end

end
