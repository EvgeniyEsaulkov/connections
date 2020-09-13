module Types
  class QueryType < Types::BaseObject
    field :events, [Types::EventType],
          null: false, description: "Returns a list of events"
    field :event, Types::EventType, null: true do
      argument :id, ID, required: true
    end

    def events
      Event.all
    end

    def event(id:)
      Event.find(id)
    end
  end
end
