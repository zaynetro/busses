class CreateTimetables < ActiveRecord::Migration

  def change
    create_table :timetables do |t|
      t.references :route, index: true
      t.references :stop, index: true
      t.string :weekday
      t.time :time

      t.timestamps
    end
    add_index :timetables, :weekday
  end

  def down
    drop_table :timetables
  end

end
