import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { Application } from "./Application";
import { store } from "./state/store";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Application />
      </Provider>
    </StrictMode>,
  );
}
