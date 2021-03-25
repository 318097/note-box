import React from "react";
import ReactDOM from "react-dom";
import mixpanel from "mixpanel-browser";
import App from "./src/App";
import "./index.css";

mixpanel.init("ID");

ReactDOM.render(<App />, document.getElementById("root"));
