import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// CSS
import "./theme/global.css";
import "react-toastify/dist/ReactToastify.css";

// Providers
import NotificationProvider from "./context/NotificationProvider";

// Toast Alert
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./components/Toast/Toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ToastContainer
      style={{ minWidth: toastConfig.minWidth }}
      theme={toastConfig.theme}
    />
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);

reportWebVitals();
