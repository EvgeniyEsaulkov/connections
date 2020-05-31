class Api::V1::EventsController < ApplicationController
  ALLOWED_PARAMS = %i[title start_time end_time kind location description].freeze

  def index
    events = Event.all.order(created_at: :asc)
    render json: events
  end

  def create
    event = Event.create!(event_params)

    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def show
    if event
      render json: event
    else
      render json: "Event not found"
    end
  end

  def destroy
    event&.destroy
    render json: { message: "Event deleted!" }
  end

  private

  def event_params
    params.permit(*ALLOWED_PARAMS)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
