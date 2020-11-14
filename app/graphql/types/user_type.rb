module Types
  class UserType < Types::BaseObject
    field :name, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
  end
end
