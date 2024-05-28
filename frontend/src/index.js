import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";
import { fetchUserProfile } from "./store/profile";
import { ModalProvider } from "./context/Modal";

const store = configureStore();
window.fetchUserProfile = fetchUserProfile;

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApplication = () => {
  root.render(<Root />);
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
