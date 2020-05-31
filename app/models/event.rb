class Event < ApplicationRecord
  validates :title, presence: true
  validates :start_time, presence: true
  validates :kind, presence: true
  validates :location, presence: true
end
