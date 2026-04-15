import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
import { ListsProvider } from "./context/ListsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ListsProvider>
        <App />
      </ListsProvider>
    </HashRouter>
  </React.StrictMode>
);