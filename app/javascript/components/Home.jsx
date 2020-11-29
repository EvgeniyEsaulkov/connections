import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="grid-container fluid full-height primary-color">
    <div className="grid-x full-height align-middle secondary-color">
      <div className="large-4 medium-4 small-4 float-center">
        <h1>Sport Events</h1>
        <p className="lead">A curated list of sport events in your neighborhood.</p>
        <hr className="my-4" />
        <Link
          to="/events"
          className="button large custom-button"
          role="button"
        >
          View events
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
