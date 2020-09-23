FactoryBot.define do
  factory :event do
    title { generate(:event_title) }
    start_time { 2.days.from_now }
    end_time { 3.days.from_now }
    kind { "chess" }
    description { "Try to win!" }
  end
end
