class Timetable < ActiveRecord::Base
  belongs_to :route
  belongs_to :stop
end
