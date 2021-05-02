import { MosaicNode } from "react-mosaic-component";
import { WindowId } from "./WindowId";

/**
 * The definition of one or a graph of windows.
 *
 * This is a graph data structure, and the entire window state is represented as a root node.
 */
export type WindowState = MosaicNode<WindowId>;
