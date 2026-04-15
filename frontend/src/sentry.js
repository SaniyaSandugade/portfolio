import * as Sentry from "@sentry/react";

export const initSentry = () => {
  Sentry.init({
    dsn: "https://5792d8704c3c12911cbb5dfb8771884d@o4511224228937728.ingest.de.sentry.io/4511224260198480",

    tracesSampleRate: 1.0,
  });
};