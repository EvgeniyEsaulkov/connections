FactoryBot.define do
  sequence :event_title do |n|
    "Chess tournament ##{n}"
  end
end
