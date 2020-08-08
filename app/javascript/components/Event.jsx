import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { description: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ event: response }))
      .catch(() => this.props.history.push("/events"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteEvent() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/events"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { event } = this.state;
    const eventDescription = this.addHtmlEntities(event.description);

    return (
      <div className="grid-container fluid primary-color">
        <div className="hero align-items-center justify-content-center">
          <div className="container large-5 medium-5 small-5">
            <h1>
              {event.title}
            </h1>
            <h4>
              {event.kind}
            </h4>
          </div>
          <div className="container large-5 medium-5 small-5">
            <div className="grid-x">
              <div className="small-12 large-9">
                <h5>Description</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${eventDescription}`
                  }}
                />
              </div>
              <div className="small-12 large-3">
                <button type="button" className="button alert" onClick={this.deleteEvent}>
                  Delete Event
                </button>
              </div>
            </div>
            <Link to="/events" className="clear button large">
              Back to events
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  history: PropTypes.func.isRequired,
  match: PropTypes.func.isRequired,
};

export default Event;
