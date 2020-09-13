import React from "react";
import { render } from "react-dom";
import "foundation-sites/dist/css/foundation";
import App from "../components/App";
import Provider from '../components/Provider';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("main"))
  );
});
