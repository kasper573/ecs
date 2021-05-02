import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";
import { getOpenWindows } from "./getOpenWindows";

export const isWindowOpen = (root: WindowState, id: WindowId) =>
  getOpenWindows(root).includes(id);
