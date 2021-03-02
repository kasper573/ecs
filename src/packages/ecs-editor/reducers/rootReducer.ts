import { EditorActions } from "../types/EditorActions";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { actionToReducer } from "../actionToReducer";

/**
 * Provides an action reducer interface for all other reducers.
 * All actions go through this reducer initially, and reroutes to the specific
 * reducer for the specified action (see actionToReducer.ts)
 */
export const rootReducer: EditorStateReducer<EditorActions> = (
  state,
  { type, payload }
) => {
  const reducer = actionToReducer[type] as EditorStateReducer<unknown>;
  return reducer(state, payload);
};
