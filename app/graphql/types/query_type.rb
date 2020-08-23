module Types
  class QueryType < Types::BaseObject
    field :events, [Types::EventType],
          null: false, description: "Returns a list of events"

    def events
      Event.all
    end
  end
end
