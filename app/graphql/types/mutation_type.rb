module Types
  class MutationType < Types::BaseObject
    implements ::Types::GraphqlAuth

    field :delete_event, mutation: Mutations::DeleteEvent, description: "Delete event by ID"
  end
end
