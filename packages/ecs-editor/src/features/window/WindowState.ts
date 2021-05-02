import { MosaicNode, MosaicPath } from "react-mosaic-component";
import { WindowId } from "./WindowId";

/**
 * The current state of all windows.
 *
 *
 */
export type WindowState = {
  /**
   * The root node representing the window graph
   * (passed to the react-mosaic library for window rendering)
   */
  graph: MosaicNode<WindowId>;
  /**
   * The split percentages used before hiding
   */
  splitPercentages: Record<WindowId, number>; // 0-100
};
