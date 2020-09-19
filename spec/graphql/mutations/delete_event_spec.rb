require "rails_helper"

describe Mutations::DeleteEvent do
  let!(:event) do
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
      mutation {
        deleteEvent (id: #{event_id}) {
          message
        }
      }
    GRAPHQL
  end

  context "with valid ID" do
    let(:event_id) { 1_234 }

    it_behaves_like "graphql request", "returns success message" do
      let(:fixture_path) { "json/acceptance/graphql/delete_event.json" }
    end
  end

  context "with invalid ID" do
    let(:event_id) { 4_321 }

    it_behaves_like "graphql request", "returns error" do
      let(:fixture_path) { "json/acceptance/graphql/delete_event_wrong.json" }
    end
  end
end
