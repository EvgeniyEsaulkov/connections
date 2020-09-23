shared_context "when time is frozen" do
  let(:current_time) { Time.zone.local(2020, 9, 7, 12, 30) }

  before { travel_to(current_time) }

  after { travel_back }
end
