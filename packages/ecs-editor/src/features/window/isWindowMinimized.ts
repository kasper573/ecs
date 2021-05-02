import { WindowState } from "./WindowState";
import { getSplitPercentage } from "./getSplitPercentage";
import { WindowId } from "./WindowId";
import { getPathToKey } from "./getPathToKey";

export const isWindowMinimized = (
  graph: WindowState["graph"],
  id: WindowId
) => {
  const branch = (getPathToKey(graph, id) ?? []).pop();
  const minimizedPercentage = branch === "first" ? 0 : 100;
  return getSplitPercentage(graph, id) === minimizedPercentage;
};
