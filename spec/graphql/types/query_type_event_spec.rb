require "rails_helper"

describe Types::QueryType do
  include_context "when time is frozen"

  let(:event) do
    create(:event,
           id: 1_234,
           title: "Football game",
           start_time: 2.hours.from_now,
           end_time: 4.hours.from_now,
           kind: "soccer",
           location: "'Trudovye rezervy' stadium")
  end
  let(:query) do
    <<-GRAPHQL
      query {
        event(id: 1234) {
          id
          title
          kind
          startTime
          endTime
          location
        }
      }
    GRAPHQL
  end

  before { event }

  it_behaves_like "graphql request", "gets events list" do
    let(:fixture_path) { "json/acceptance/graphql/query_type_event.json" }
  end
end
