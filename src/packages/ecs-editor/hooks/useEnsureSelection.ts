import { Dispatch, useEffect } from "react";
import { EditorState } from "../types/EditorState";
import { ensureSelection } from "../mutations/ensureSelection";
import { EditorActions } from "../types/EditorActions";

/**
 * Hook version of ensureSelection.ts
 */
export const useEnsureSelection = (
  state: EditorState,
  dispatch: Dispatch<EditorActions>
) =>
  useEffect(() => {
    const update = ensureSelection(state);
    if (update !== state) {
      dispatch({ type: "UPDATE_STATE", update });
    }
  }, [state, dispatch]);
