module Types
  class MutationType < Types::BaseObject
    field :delete_event, mutation: Mutations::DeleteEvent, description: "Delete event by ID"
  end
end
