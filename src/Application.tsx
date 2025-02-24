import { Fragment } from "react";
import { Provider } from "react-redux";

import { Canvas } from "./components/Canvas";
import { Navbar } from "./components/Navbar";
import { store } from "./state/store";

export function Application() {
  return (
    <Fragment>
      <Navbar />
      <Provider store={store}>
        <Canvas />
      </Provider>
    </Fragment>
  );
}
