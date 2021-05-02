import { WindowState } from "../features/window/WindowState";
import { WindowId } from "../features/window/WindowId";

export const defaultWindowState: WindowState = {
  direction: "row",
  first: "runtime" as WindowId,
  second: {
    first: "hierarchy" as WindowId,
    second: {
      first: "inspector" as WindowId,
      second: "library" as WindowId,
      direction: "column",
      splitPercentage: 40,
    },
    direction: "row",
    splitPercentage: 50,
  },
  splitPercentage: 55,
};
