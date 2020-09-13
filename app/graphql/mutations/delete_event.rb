module Mutations
  class DeleteEvent < BaseMutation
    argument :id, ID, required: true

    type Types::MessageType

    def resolve(id:)
      Event.find(id).destroy!

      {
        message: "Event was successfully deleted"
      }
    end
  end
end
