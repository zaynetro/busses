# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141029091551) do

  create_table "routes", id: false, force: true do |t|
    t.string   "num"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "routes", ["num"], name: "index_routes_on_num", unique: true

  create_table "stops", id: false, force: true do |t|
    t.string   "num"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stops", ["num"], name: "index_stops_on_num", unique: true

  create_table "timetables", force: true do |t|
    t.integer  "route_id"
    t.integer  "stop_id"
    t.string   "weekday"
    t.time     "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "timetables", ["route_id"], name: "index_timetables_on_route_id"
  add_index "timetables", ["stop_id"], name: "index_timetables_on_stop_id"
  add_index "timetables", ["weekday"], name: "index_timetables_on_weekday"

end
