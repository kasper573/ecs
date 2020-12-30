import React from "react";
import { render } from "@testing-library/react";
import { theme } from "../fixtures/theme";
import App from "./App";

test("renders without throwing", () => {
  expect(() => render(<App theme={theme} />)).not.toThrow();
});
