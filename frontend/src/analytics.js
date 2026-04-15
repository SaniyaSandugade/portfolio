import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-PKDEFY3PP9";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Page tracking
export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// 🔥 EVENT TRACKING (NEW)
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};




