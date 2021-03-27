import { EditorState } from "../types/EditorState";
import { selectInspectedObject } from "./selectInspectedObject";

export const selectSelectedEntityInitializer = (state: EditorState) => {
  const inspected = selectInspectedObject(state);
  return inspected?.type === "entityInitializer" ? inspected.object : undefined;
};
