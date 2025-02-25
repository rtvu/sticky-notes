import { Fragment } from "react";

import { Canvas } from "./components/Canvas";
import { Controls } from "./components/Controls";
import { Navbar } from "./components/Navbar";

export function Application() {
  return (
    <Fragment>
      <Canvas />
      <Navbar />
      <Controls />
    </Fragment>
  );
}
