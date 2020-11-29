import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Events from "../components/Events";
import Event from "../components/Event";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/events" exact component={Events} />
      <Route path="/event/:id" exact component={Event} />
    </Switch>
  </Router>
);
