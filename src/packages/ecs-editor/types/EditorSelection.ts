import { EditorObjects } from "./EditorObjects";

/**
 * Selected indexes of the editor objects
 */
export type EditorSelection = Record<keyof EditorObjects, number>;
