class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.integer :number
      t.string :name

      t.timestamps
    end
  end
end
