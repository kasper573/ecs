import { getLeaves } from "react-mosaic-component";
import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";

export const getOpenWindows = (root: WindowState): readonly WindowId[] =>
  getLeaves(root);
