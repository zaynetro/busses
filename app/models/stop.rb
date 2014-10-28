class Stop < ActiveRecord::Base
  has_many :timetables
  validates :name, presence: true,
                   length: { minimum: 2 }

  validates :number, presence: true
end
