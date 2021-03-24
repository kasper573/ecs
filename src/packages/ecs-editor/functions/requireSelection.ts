import {
  EditorSelectionName,
  EditorSelectionValues,
  EditorSelectionValuesDefined,
} from "../types/EditorSelection";

export const requireSelection = <K extends EditorSelectionName>(
  selection: EditorSelectionValues,
  name: K
) => {
  const value = selection[name];
  if (value !== undefined) {
    return value as EditorSelectionValuesDefined[K];
  }
  throw new Error("Can't proceed without selection: " + name);
};
