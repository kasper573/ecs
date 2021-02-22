import { EditorSelectionObjects } from "./EditorSelectionObjects";

/**
 * Selected indexes of the editor objects
 */
export type EditorSelection = Record<keyof EditorSelectionObjects, number>;
