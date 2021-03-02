import { Dispatch, useEffect } from "react";
import { EditorState } from "../types/EditorState";
import { ensureSelectionReducer } from "../reducers/ensureSelectionReducer";
import { EditorActions } from "../types/EditorActions";

/**
 * Hook version of ensureSelection.ts
 */
export const useEnsureSelection = (
  state: EditorState,
  dispatch: Dispatch<EditorActions>
) =>
  useEffect(() => {
    const update = ensureSelectionReducer(state);
    if (update !== state) {
      dispatch({ type: "UPDATE_STATE", payload: update });
    }
  }, [state, dispatch]);
