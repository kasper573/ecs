import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";

export const createWindowState = (): WindowState => ({
  direction: "row",
  first: "runtime" as WindowId,
  second: {
    first: "hierarchy" as WindowId,
    second: {
      first: "inspector" as WindowId,
      second: "library" as WindowId,
      direction: "column",
      splitPercentage: 39.900249376558605,
    },
    direction: "row",
    splitPercentage: 50.27027027027026,
  },
  splitPercentage: 54.730831973898866,
});
