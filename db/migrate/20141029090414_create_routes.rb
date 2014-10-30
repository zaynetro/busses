class CreateRoutes < ActiveRecord::Migration

  def change
    create_table :routes, :primary_key => :num do |t|
      t.string :description

      t.timestamps
    end
    change_column :routes, :num, :string
    add_index :routes, :num, unique: true
  end

  def down
    drop_table :routes
    remove_index :routes, :num
  end

end
