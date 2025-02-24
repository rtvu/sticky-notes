import { Fragment } from "react";

import { Canvas } from "./components/Canvas";
import { Navbar } from "./components/Navbar";

export function Application() {
  return (
    <Fragment>
      <Navbar />
      <Canvas />
    </Fragment>
  );
}
