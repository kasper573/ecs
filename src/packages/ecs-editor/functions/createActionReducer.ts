import { ActionToReducer } from "../actionToReducer";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { EditorActions } from "../types/EditorActions";

export const createActionReducer = (
  actionToReducer: ActionToReducer,
  postActionReducer: EditorStateReducer<void> = (state) => state
): EditorStateReducer<EditorActions> => (state, { type, payload }) => {
  const reducer = actionToReducer[type] as EditorStateReducer<unknown>;
  const postActionState = reducer(state, payload);
  return postActionReducer(postActionState);
};
