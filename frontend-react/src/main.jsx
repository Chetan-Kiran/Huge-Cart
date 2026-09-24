import React from "react";
import ReactDOM from "react-dom/client";
import { OrderProvider } from "./context/Ordercontext";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </React.StrictMode>,
);
