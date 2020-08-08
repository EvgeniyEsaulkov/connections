import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/events/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ events: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { events } = this.state;
    const allEvents = events.map((event, index) => (
      <div key={index} className="medium-6 large-4">
        <div className="card without-border">
          <div className="card-section">
            <h5>{event.title}</h5>
            <Link to={`/event/${event.id}`} className="button custom-button">
              View Event
            </Link>
          </div>
        </div>
      </div>
    ));
    const noEvent = (
      <div className="hero align-items-center justify-content-center">
        <h4>
          No events yet. Why not <Link to="/new_event">create one</Link>
        </h4>
      </div>
    );

    return (
      <div className="grid-container fluid full-height primary-color">
        <section className="text-center">
          <div className="container">
            <h1>Events in your neighborhood</h1>
          </div>
        </section>
        <div className="large-5 medium-5 small-5">
          <main>
            <div className="text-right">
              <Link to="/event" className="button custom-button">
                Create New Event
              </Link>
            </div>
            <div className="grid-x">
              {events.length > 0 ? allEvents : noEvent}
            </div>
            <Link to="/" className="clear button large">
              Home
            </Link>
          </main>
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Events;
