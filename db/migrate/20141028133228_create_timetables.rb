class CreateTimetables < ActiveRecord::Migration
  def change
    create_table :timetables do |t|
      t.references :stop, index: true
      t.datetime :time
      t.string :day

      t.timestamps
    end
  end
end
