import { MosaicNode } from "react-mosaic-component";
import { WindowId } from "./WindowId";

/**
 * The current state of all windows.
 * (Root node of graph structure. Null when there are no windows)
 */
export type WindowState = MosaicNode<WindowId> | null;
