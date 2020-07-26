import React from "react";
import { render } from "react-dom";
import "foundation-sites/dist/css/foundation";
import App from "../components/App";

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("main")),
  );
});
