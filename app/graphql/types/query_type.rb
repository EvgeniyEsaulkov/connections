module Types
  class QueryType < Types::BaseObject
    field :events, [Types::EventType],
          null: false, description: "Returns a list of events"
    field :event, Types::EventType, null: true do
      argument :id, ID, required: true
      description "Returns the event for a requested id"
    end
    field :user, Types::UserType, null: true do
      argument :id, ID, required: true
      description "Returns the user for a requested id"
    end

    def events
      Event.all
    end

    def event(id:)
      Event.find_by(id: id)
    end

    def user(id:)
      User.find_by(id: id)
    end
  end
end
