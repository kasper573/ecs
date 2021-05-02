import { WindowState } from "./WindowState";

const defaultGraph: WindowState["graph"] = {
  direction: "row",
  first: {
    first: "runtime",
    second: "code",
    direction: "column",
    splitPercentage: 66.58354114713218,
  },
  second: {
    first: "hierarchy",
    second: {
      first: "inspector",
      second: "library",
      direction: "column",
      splitPercentage: 39.900249376558605,
    },
    direction: "row",
    splitPercentage: 41.914893617021285,
  },
  splitPercentage: 61.66394779771615,
};

export const createWindowState = (): WindowState => ({
  graph: defaultGraph,
  splitPercentages: {},
});
