import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./src/tracking";
import App from "./src/App";
import "./index.css";

Sentry.init({
  dsn: "",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Sentry.ErrorBoundary fallback={"An error has occurred"}>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById("root")
);
