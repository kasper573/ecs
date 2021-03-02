import { EditorStateReducer } from "../types/EditorStateReducer";
import { EditorState } from "../types/EditorState";

export const updateStateReducer: EditorStateReducer<Partial<EditorState>> = (
  state,
  update
) => {
  return { ...state, ...update };
};
