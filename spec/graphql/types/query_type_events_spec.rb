require "rails_helper"

describe Types::QueryType do
  include_context "when time is frozen"

  let!(:event) do
    create(:event,
           title: "Football game",
           start_time: 2.hours.from_now,
           end_time: 4.hours.from_now,
           kind: "soccer",
           location: "'Trudovye rezervy' stadium")
  end
  let(:query) do
    <<-GRAPHQL
      query {
        events {
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

  it_behaves_like "graphql request", "gets events list" do
    let(:fixture_path) { "json/acceptance/graphql/query_type_events.json" }
    let(:prepared_fixture_file) { fixture_file.gsub(/:id/, ":id" => event.id) }
  end
end
