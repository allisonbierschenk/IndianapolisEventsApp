class Event < ApplicationRecord
  def self.create_from_collection (events_list)
    events_list.each do |event_hash|
      Event.create(event_hash)
      end
    end
end
