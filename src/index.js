import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- ADD THIS
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* <-- WRAP App WITH BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
