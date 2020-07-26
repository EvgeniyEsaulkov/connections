module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :events, [Types::EventType], null: false,
      description: "Returns a list of events"

    def events
      Event.all
    end
  end
end
