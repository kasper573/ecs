import { getLeaves } from "react-mosaic-component";
import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";

export const isWindowOpen = (root: WindowState, id: WindowId) =>
  getLeaves(root).includes(id);
