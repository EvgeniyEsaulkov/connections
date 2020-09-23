module Mutations
  class DeleteEvent < BaseMutation
    argument :id, ID, required: true

    type Types::MessageType

    def resolve(id:)
      event = Event.find_by(id: id)

      if event
        event.destroy!

        {
          message: "Event was successfully deleted"
        }
      else
        execution_error(error_data: { message: "Event not found" })
      end
    end
  end
end
