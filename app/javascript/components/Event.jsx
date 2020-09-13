import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const EVENT_QUERY = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      title
      kind
      description
    }
  }
`

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      message
    }
  }
`

const eventLoading = (
  <div className="hero align-items-center justify-content-center">
    <h4>
      Loading event data...
    </h4>
  </div>
);

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { description: "" } };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  _getQueryVariables() {
    const id = this.props.match.params.id
    return { id }
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    return (
      <Query query={EVENT_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
          if (loading) return eventLoading
          if (error) return <div>Error</div>

          const eventDescription = this.addHtmlEntities(data.event.description)

          return (
            <div className="grid-container fluid primary-color">
              <div className="hero align-items-center justify-content-center">
                <div className="container large-5 medium-5 small-5">
                  <h1>
                    {data.event.title}
                  </h1>
                  <h4>
                    {data.event.kind}
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
                      <Mutation
                        mutation={DELETE_EVENT}
                        variables={this._getQueryVariables()}
                        onCompleted={data => this._redirectToEvents(data)}
                      >
                        {mutation => (
                          <button type="button" className="button alert" onClick={mutation}>
                            Delete Event
                          </button>
                        )}
                      </Mutation>
                    </div>
                  </div>
                  <Link to="/events" className="clear button large">
                    Back to events
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    )
  }

  async _redirectToEvents(data) {
    this.props.history.push("/events")
  }
}

Event.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Event;
